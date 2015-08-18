// import { provide } from 'react-redux';

// @provide(store)
export default function ticksHandler(r) {
    this.ticks.appendData({
        symbol: r.echo.ticks,
        quote: r.data.quote,
        epoch: r.data.epoch,
    });
    this.dataChanged('ticks');
}
