"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var HomeComponent = /** @class */ (function () {
    function HomeComponent() {
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.total = 125;
        this.current = 56;
        this.needed = this.total - this.current;
        this.percentage = (this.current * 100) / this.total;
    };
    HomeComponent.prototype.Over = function () {
        var _this = this;
        console.log(this.total + ' - ' + this.current + ' - ' + this.needed);
        document.getElementById('popover-m').style.display = 'block';
        var bar = document.getElementById("progress");
        var width = 1;
        document.getElementById('indicatorArrow').style.left = this.percentage - 2 + '%';
        document.getElementById('indicator').style.left = this.percentage - 6 + '%';
        var animation = setInterval(function () {
            if (width >= _this.percentage) {
                clearInterval(animation);
            }
            else {
                width++;
                var progress = document.getElementById('indicator');
                //progress.innerHTML = progress.innerHTML.replace('Var-current', this.progress);
                bar.style.width = width + '%';
            }
        }, 10);
    };
    HomeComponent.prototype.Out = function () {
        document.getElementById('popover-m').style.display = 'none';
    };
    HomeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'home',
            styleUrls: ['home.styles.css'],
            templateUrl: 'home.template.html'
        }),
        __metadata("design:paramtypes", [])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map