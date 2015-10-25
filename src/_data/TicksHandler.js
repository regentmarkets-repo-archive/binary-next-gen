// import { provide } from 'react-redux';

// @provide(store)
export default function ticksHandler(response) {
    this.ticks.appendData({
        symbol: response.echo_req.ticks,
        quote: response.ticks.quote,
        epoch: response.ticks.epoch,
    });
    this.dataChanged('ticks');
}
