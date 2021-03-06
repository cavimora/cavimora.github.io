import { AsyncAction } from './AsyncAction';
import { Subscription } from '../Subscription';
import { AsyncScheduler } from './AsyncScheduler';

export class VirtualTimeScheduler extends AsyncScheduler {

  protected static frameTimeFactor: number = 10;

  public frame: number = 0;
  public index: number = -1;

  constructor(SchedulerAction: typeof AsyncAction = VirtualAction,
              public maxFrames: number = Number.POSITIVE_INFINITY) {
    super(SchedulerAction, () => this.frame);
  }

  /**
   * Prompt the Scheduler to execute all of its queued actions, therefore
   * clearing its queue.
   * @return {void}
   */
  public flush(): void {

    const {actions, maxFrames} = this;
    let error: any, action: AsyncAction<any>;

    while ((action = actions.shift()) && (this.frame = action.delay) <= maxFrames) {
      if (error = action.execute(action.state, action.delay)) {
        break;
      }
    }

    if (error) {
      while (action = actions.shift()) {
        action.unsubscribe();
      }
      throw error;
    }
  }
}

/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
export class VirtualAction<T> extends AsyncAction<T> {

  constructor(protected scheduler: VirtualTimeScheduler,
              protected work: (this: VirtualAction<T>, state?: T) => void,
              protected index: number = scheduler.index += 1) {
    super(scheduler, work);
    this.index = scheduler.index = index;
  }

  public schedule(state?: T, delay: number = 0): Subscription {
    return !this.id ?
      super.schedule(state, delay) : (
      // If an action is rescheduled, we save allocations by mutating its state,
      // pushing it to the end of the scheduler queue, and recycling the action.
      // But since the VirtualTimeScheduler is used for testing, VirtualActions
      // must be immutable so they can be inspected later.
      <VirtualAction<T>> this.add(
        new VirtualAction<T>(this.scheduler, this.work))
      ).schedule(state, delay);
  }

  protected requestAsyncId(scheduler: VirtualTimeScheduler, id?: any, delay: number = 0): any {
    this.delay = scheduler.frame + delay;
    const {actions} = scheduler;
    actions.push(this);
    actions.sort(VirtualAction.sortActions);
    return true;
  }

  protected recycleAsyncId(scheduler: VirtualTimeScheduler, id?: any, delay: number = 0): any {
    return undefined;
  }

  public static sortActions<T>(a: VirtualAction<T>, b: VirtualAction<T>) {
    if (a.delay === b.delay) {
      if (a.index === b.index) {
        return 0;
      } else if (a.index > b.index) {
        return 1;
      } else {
        return -1;
      }
    } else if (a.delay > b.delay) {
      return 1;
    } else {
      return -1;
    }
  }
}
