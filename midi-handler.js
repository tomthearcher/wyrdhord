/**
 * MIDI Handler for WebApps_MENU collection.
 * Provides a unified interface for MIDI Notes, CC, and Clock.
 */

window.MIDIHandler = (function () {
    let midiAccess = null;
    let clockCount = 0;
    let lastClockTime = 0;
    let bpm = 120;
    let listeners = {
        noteon: [],
        noteoff: [],
        cc: [],
        clock: [],
        beat: []
    };

    function init() {
        if (navigator.requestMIDIAccess) {
            navigator.requestMIDIAccess({ sysex: false })
                .then(onMIDISuccess, onMIDIFailure);
        } else {
            console.warn("Web MIDI API not supported in this browser.");
        }
    }

    function onMIDISuccess(access) {
        midiAccess = access;
        for (let input of midiAccess.inputs.values()) {
            input.onmidimessage = onMIDIMessage;
        }
        midiAccess.onstatechange = (e) => {
            if (e.port.type === 'input' && e.port.state === 'connected') {
                e.port.onmidimessage = onMIDIMessage;
            }
        };
        console.log("MIDI Access successful.");
    }

    function onMIDIFailure() {
        console.error("Could not access your MIDI devices.");
    }

    function onMIDIMessage(event) {
        let data = event.data;
        let cmd = data[0] >> 4;
        let channel = data[0] & 0xf;
        let type = data[0] & 0xf0; // Channel independent

        // System Common messages (Clock)
        if (data[0] === 0xF8) {
            handleClock();
            return;
        }

        let note = data[1];
        let velocity = data[2];

        console.log(`MIDI Message: Type=0x${type.toString(16)}, Note=${note}, Vel=${velocity}, Chan=${channel + 1}`);

        switch (type) {
            case 0x90: // noteOn
                if (velocity > 0) {
                    emit('noteon', { note, velocity, channel });
                } else {
                    emit('noteoff', { note, velocity, channel });
                }
                break;
            case 0x80: // noteOff
                emit('noteoff', { note, velocity, channel });
                break;
            case 0xB0: // control change
                emit('cc', { controller: data[1], value: data[2], channel });
                break;
        }
    }

    function handleClock() {
        let now = performance.now();
        if (lastClockTime > 0) {
            // Clock is sent 24 times per quarter note (PPQN)
            let period = now - lastClockTime;
            // Very basic BPM calculation (averaging would be better for stability)
            // but this updates every clock tick
            // bpm = 60000 / (period * 24); 
        }
        lastClockTime = now;

        clockCount++;
        emit('clock', { count: clockCount });

        if (clockCount % 24 === 0) {
            emit('beat', { beat: clockCount / 24 });
        }
    }

    function emit(event, data) {
        if (listeners[event]) {
            listeners[event].forEach(callback => callback(data));
        }
    }

    return {
        init: init,
        on: function (event, callback) {
            if (listeners[event]) {
                listeners[event].push(callback);
            }
        },
        getBPM: function () { return bpm; }
    };
})();

// Auto-init on script load
if (document.readyState === 'complete') {
    window.MIDIHandler.init();
} else {
    window.addEventListener('load', () => window.MIDIHandler.init());
}
