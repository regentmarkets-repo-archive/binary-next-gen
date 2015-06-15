import { LiveEvents, LiveApi, LiveData } from "binary-live-api";

LiveApi.init();
//LiveApi.send({ offerings: 1 });
LiveApi.send({ ticks: 'R_100' });
LiveApi.send({ ticks: 'frxXPDUSD' });

LiveEvents.on('message', function(data) {
    if (data.offerings) {
        offerings = data.offerings.offerings;
    }
    if (data.ticks) {
        ticks[data.ticks] = data;
    }
});

export let offerings;
export let ticks = {};
