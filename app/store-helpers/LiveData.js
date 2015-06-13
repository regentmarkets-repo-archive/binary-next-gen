import { LiveEvents, LiveApi, LiveData } from "binary-live-api";

LiveApi.init();
LiveApi.send({ offerings: 1 });

var offerings;

LiveEvents.on('message', function(data) {
    if (data.offerings) {
        offerings = data.offerings.offerings;
    }
});
