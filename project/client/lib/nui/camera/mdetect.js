



/**
 * NUI related code , deep depends method.
 * @function CREATE_MOTION_PARAMETERS
 * @param {GameObject} ROOT_GAME_OBJECT System usage.
 * @access no direct usage
 */
function CREATE_MOTION_PARAMETERS(ROOT_GAME_OBJECT) {

    window["notesPosY"] = [];
    window["notesPosX"] = [];

    for (var j = 0; j < ROOT_GAME_OBJECT.WEBCAM.numFieldV; j++) {
        for (var d = 0; d < ROOT_GAME_OBJECT.WEBCAM.numFieldH; d++) {
            ROOT_GAME_OBJECT.WEBCAM._N_.push("0");

            if (d == 0) {
                //notesPosX.push(  ROOT_GAME_OBJECT.POSITION.X()  );
                notesPosX.push(0);
            } else { //notesPosX
                notesPosX.push(d * ROOT_GAME_OBJECT.WEBCAM.BLEND_CANVAS.width / 8);
            }

            if (j == 0) {
                notesPosY.push(0);
            } else {
                //notesPosY.push(   ROOT_GAME_OBJECT.POSITION.X() +  j* ROOT_GAME_OBJECT.DIMENSION.WIDTH()/8 );
                notesPosY.push(j * ROOT_GAME_OBJECT.WEBCAM.BLEND_CANVAS.width / 8);
            }

        }

    }

}

/**
 * @Example NUI related code , deep depends method.
 */
function CREATE_MOTION_FIELDS(ROOT_GAME_OBJECT) {
    var source = "test";

    var sum = ROOT_GAME_OBJECT.WEBCAM.numFieldV * ROOT_GAME_OBJECT.WEBCAM.numFieldH;

    for (var i = 0; i < sum; i++) {

        var note = {
            note: source,
            ready: true,
            visual: "test2"
        };
        note.area = {
            x: notesPosX[i],
            y: notesPosY[i],
            width: ROOT_GAME_OBJECT.WEBCAM.BLEND_CANVAS.width / 8,
            height: ROOT_GAME_OBJECT.WEBCAM.BLEND_CANVAS.height / 8
        };
        ROOT_GAME_OBJECT.WEBCAM.NOTES.push(note);

    }

}

/**
 * @Example NUI related code , depends method.
 */
window["ARRAY_SOUND"] = [];

for (var s = 0; s < 1; s++) {
    ARRAY_SOUND.push("sounds/note1.mp3");
}

/**
 * @Example NUI related code , depends method.
 */
function loadSounds() {
    soundContext = new AudioContext();
    bufferLoader = new BufferLoader(soundContext, ARRAY_SOUND,
            finishedLoading);
    bufferLoader.load();
}

function finishedLoading(bufferList) {

    /* var source = soundContext.createBufferSource();
    source.buffer = bufferList[0];
    source.connect(soundContext.destination);
     */
}

/**
 * NUI related code , depends method.
 * playSound
 *
 */
function playSound(obj) {
    if (!obj.ready)
        return;
    var source = soundContext.createBufferSource();
    source.buffer = obj.note.buffer;
    source.connect(soundContext.destination);
    source.noteOn(0);
    obj.ready = false;
    // throttle the note
    setTimeout(setNoteReady, 400, obj);
}

function setNoteReady(obj) {
    obj.ready = true;
}


var lastImageData;

/**
 * NUI related code , deep depends method.
 * @function blend
 * @return nothing
 * @access Global
 */
function blend(GO, s) {
    //var width = DIMENSION.WIDTH();
    //var height = DIMENSION.HEIGHT();
    //ROOT_GAME_OBJECT.WEBCAM.BS

    var width = GO.WEBCAM.BLEND_CANVAS.width;
    var height = GO.WEBCAM.BLEND_CANVAS.width;

    // s.drawImage(GO.WEBCAM.VIDEO , GO.POSITION.X() , GO.POSITION.Y() , width, height);
    GO.WEBCAM.RC.drawImage(GO.WEBCAM.VIDEO, 0, 0, width, height);

    // get webcam image data
    //var sourceData = s.getImageData( GO.POSITION.X() , GO.POSITION.Y() , width, height);
    var sourceData = GO.WEBCAM.RC.getImageData(0, 0, width, height);
    // create an image if the previous image doesn’t exist
    //if (!lastImageData) lastImageData = s.getImageData(POSITION.X(), POSITION.Y(), width, height);
    //if (!lastImageData) lastImageData = s.getImageData(GO.POSITION.X() , GO.POSITION.Y(), width, height);
    if (!lastImageData)
        lastImageData = GO.WEBCAM.RC.getImageData(0, 0, width, height);
    // create a ImageData instance to receive the blended result
    var blendedData = GO.WEBCAM.RC.createImageData(width, height);
    // blend the 2 images
    differenceAccuracy(blendedData.data, sourceData.data, lastImageData.data);
    // draw the result in a canvas
    GO.WEBCAM.BS.putImageData(blendedData, 0, 0);
    // store the current webcam image
    lastImageData = sourceData;
}

function fastAbs(value) {
    // funky bitwise, equal Math.abs
    return (value ^ (value >> 31)) - (value >> 31);
}

function threshold(value) {
    return (value > 0x15) ? 0xFF : 0;
}

function difference(target, data1, data2) {
    // blend mode difference
    if (data1.length != data2.length)
        return null;
    var i = 0;
    while (i < (data1.length * 0.25)) {
        target[4 * i] = data1[4 * i] == 0 ? 0 : fastAbs(data1[4 * i] - data2[4 * i]);
        target[4 * i + 1] = data1[4 * i + 1] == 0 ? 0 : fastAbs(data1[4 * i + 1] - data2[4 * i + 1]);
        target[4 * i + 2] = data1[4 * i + 2] == 0 ? 0 : fastAbs(data1[4 * i + 2] - data2[4 * i + 2]);
        target[4 * i + 3] = 0xFF;
        ++i;
    }
}

function differenceAccuracy(target, data1, data2) {
    if (data1.length != data2.length)
        return null;
    var i = 0;
    while (i < (data1.length * 0.25)) {
        var average1 = (data1[4 * i] + data1[4 * i + 1] + data1[4 * i + 2]) / 3;
        var average2 = (data2[4 * i] + data2[4 * i + 1] + data2[4 * i + 2]) / 3;
        var diff = threshold(fastAbs(average1 - average2));
        target[4 * i] = diff;
        target[4 * i + 1] = diff;
        target[4 * i + 2] = diff;
        target[4 * i + 3] = 0xFF;
        ++i;
    }
}

/**
 * NUI related code , deep depends method.
 * @function checkAreas
 * @return nothing
 * @access Global checkAreas
 */
function checkAreas(ROOT_GAME_OBJECT) {

    // loop over the note areas
    for (var r = 0; r < ROOT_GAME_OBJECT.WEBCAM.numFieldV * ROOT_GAME_OBJECT.WEBCAM.numFieldH; ++r) {
        // get the pixels in a note area from the blended image
        //var blendedData = BS.getImageData(notes[r].area.x, notes[r].area.y, notes[r].area.width, notes[r].area.height);
        var blendedData = ROOT_GAME_OBJECT.WEBCAM.BS.getImageData(ROOT_GAME_OBJECT.WEBCAM.NOTES[r].area.x, ROOT_GAME_OBJECT.WEBCAM.NOTES[r].area.y, ROOT_GAME_OBJECT.WEBCAM.NOTES[r].area.width, ROOT_GAME_OBJECT.WEBCAM.NOTES[r].area.height);

        var i = 0;
        var average = 0;
        while (i < (blendedData.data.length * 0.25)) {
            average += (blendedData.data[i * 4] + blendedData.data[i * 4 + 1] + blendedData.data[i * 4 + 2]) / 3;
            ++i;
        }

        average = Math.round(average / (blendedData.data.length * 0.25));
        if (average > 10) {

            ROOT_GAME_OBJECT.WEBCAM._N_[r] = "1";
            __DESTROY___(r, ROOT_GAME_OBJECT.WEBCAM._N_);
            WEB_CAM_NUI_MAP(r, ROOT_GAME_OBJECT.WEBCAM._N_);

        }
    }
}

function __DESTROY___(index, _N_) {
    var _N_ = _N_;
    window["T" + index] = setTimeout(function () {
            _N_[index] = "0";
        }, 1333);
}

/**
 * NUI related code , deep depends method.
 * @function WEBCAM_DRAW
 * @access Global
 */
function WEBCAM_DRAW(NUI_SURF, WEBCAM) {

    if (this.HIDE_INDICATED_POINT == false) {

        var a = 0;
        for (var i = 0; i < WEBCAM.numFieldH * WEBCAM.numFieldV; i++) {
            try {

                if (WEBCAM._N_[i] == "0") {

                    if (a > 12) {
                        window["NIK"].SET(notesPosX[i], notesPosY[i]);
                    }

                    a = 0;

                    NUI_SURF.fillStyle = "red";
                    NUI_SURF.strokeStyle = "blue";

                    NUI_SURF.fillText("point " + i, notesPosX[i], notesPosY[i], 44, 44);

                    if (i == 10) {
                        NUI_SURF.fillText("Rotate  ", notesPosX[i], notesPosY[i], 44, 44);
                    }
                    if (i == 13) {
                        NUI_SURF.fillText("Forward  ", notesPosX[i], notesPosY[i], 44, 44);
                    }
                    if (i == 15) {
                        NUI_SURF.fillText("Attack  ", notesPosX[i], notesPosY[i], 44, 44);
                    }
                    if (i == 47) {
                        NUI_SURF.fillText("Clear  ", notesPosX[i], notesPosY[i], 44, 44);
                    }

                }
                //###############################
                else { //ACTIVE
                    //###############################

                    a++;
                    //ACTIVE
                    NUI_SURF.fillStyle = "blue";
                    NUI_SURF.strokeStyle = "red";

                    NUI_SURF.strokeRect(notesPosX[i], notesPosY[i], 44, 44);
                    if (i == 10) {
                        NUI_SURF.fillText("Rotate  ", notesPosX[i], notesPosY[i], 44, 44);
                    }
                    if (i == 13) {
                        NUI_SURF.fillText("Forward  ", notesPosX[i], notesPosY[i], 44, 44);
                    }
                    if (i == 15) {
                        NUI_SURF.fillText("Attack  ", notesPosX[i], notesPosY[i], 44, 44);
                    }
                    if (i == 47) {
                        NUI_SURF.fillText("Clear  ", notesPosX[i], notesPosY[i], 44, 44);
                    }

                }

            } catch (e) {
                console.log(e);
            }

        }

    }

}

var NUI_CONTROLER = new Object();

function WEB_CAM_NUI_MAP(ee, ALL_POINTS) {

    try {
        if (ee) {
            eval(" NUI_CONTROLER.point" + ee + "();");
            //console.log("INDEX :" + ee + ">>>>>>" +ALL_POINTS )
        }
    } catch (e) {}

}
