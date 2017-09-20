import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'home',
    styleUrls: ['home.styles.css'],
    templateUrl: 'home.template.html'
})

export class HomeComponent implements OnInit {

	public total: number;
	public current: number;
	public needed: number;
	public percentage: number;
  	constructor() {
  		
  	}

  	ngOnInit() {
		this.total = 125;
		this.current = 56;
		this.needed = this.total - this.current;
		this.percentage = (this.current * 100) / this.total;
  	}

  	Over() {
  		//console.log(this.total + ' - ' + this.current + ' - ' + this.needed);
  		document.getElementById('popover-m').style.display = 'block';
        let bar = document.getElementById("progress");
        let width = 1;
        document.getElementById('indicatorArrow').style.left = this.percentage - 2 + '%';
        document.getElementById('indicator').style.left = this.percentage - 6 + '%';
        let animation = setInterval(() => {
            if (width >= this.percentage) {
                clearInterval(animation);
            } else {
                width++;
                const progress = document.getElementById('indicator');
                //progress.innerHTML = progress.innerHTML.replace('Var-current', this.progress);
                bar.style.width = width + '%';
            }
        }, 10);
  	}

  	Out() {
		document.getElementById('popover-m').style.display = 'none';
  	}

}
