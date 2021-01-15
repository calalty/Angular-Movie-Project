import { Directive, HostBinding, HostListener, Input } from "@angular/core";


@Directive({
    selector: '[fave]'
})
export class FaveDirective {
    @HostBinding('class.is-fave') isFave = true;
    @HostBinding('class.is-fave-hovering') hovering = false;
    @HostListener('mouseenter') onMouseEnter() {
        this.hovering = true;
    }
    @HostListener('mouseleave') onMouseLeave() {
        this.hovering = false;
    }
    @Input() set fave(value) {
        this.isFave = value;
    }
}


