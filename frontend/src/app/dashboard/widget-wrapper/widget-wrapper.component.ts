import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { Widget } from '../widget.model';
import { WidgetDirective } from '../widget.directive';
import { WidgetComponent } from '../widgetComponent';

@Component({
  selector: 'app-widget-wrapper',
  templateUrl: './widget-wrapper.component.html',
  styleUrls: ['./widget-wrapper.component.scss']
})
export class WidgetWrapperComponent implements OnInit {

  @Input() widget: Widget
  @ViewChild(WidgetDirective) widgetHost: WidgetDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit() {
    this.loadWidget();
  }

  loadWidget() {  
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.widget.component);

    const viewContainerRef = this.widgetHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<WidgetComponent>componentRef.instance).sensor = this.widget.sensor;
  }
}
