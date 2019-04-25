import { Card } from "./card.model";
import { Widget } from "./widget.model";
import { LineChartComponent } from "../widgets/line-chart/line-chart.component";
import { GaugeComponent } from "../widgets/gauge/gauge.component";
import { FollowItem } from "../_interface/follow-item";
import { Sensor } from "../_interface/sensor";

export class CardFactory {
    private cards: Card[];

    public buildCards(followItem: FollowItem[]): Card[] {
        this.cards = followItem.map((item: FollowItem) => {
            return this.buildSingleCard(item);
        });
        
        this.cards.sort((a, b) => {
           return a.position - b.position;
        });

        return this.cards;
    }

    public buildSingleCard(item: FollowItem) {
        let widget = this.buildWidget(item.widgetType, item.sensor);
        let title = item.sensor.clientId + '/' + item.sensor.sensorId;

        let cols = 1;
        let rows = 1;

        if (item.widgetType === 'line-chart') {
            cols = 2;
        }


        return new Card(title, cols, rows, item.position, widget, this.generateId());
    }

    private buildWidget(widgetType: string, sensor: Sensor): Widget {
        switch (widgetType) {
            case 'line-chart':
                return new Widget(LineChartComponent, sensor)

            case 'gauge':
                return new Widget(GaugeComponent, sensor)
        
            default:
                throw Error('Unkown widget type');
        }
    }

    generateId() {
        return  '' + Math.random().toString(36).substr(2, 16);
    }
}
