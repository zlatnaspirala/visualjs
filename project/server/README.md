
# Internal documentation

==============================================================================
  EMIT FLAG                                           filename
==============================================================================

  ADD_NEW_GAME_OBJECT                                            a2.js
  SET_NEW_START_UP_POSITION|DESTROY_GAME_OBJECT_WITH_DELAY       a2.js
  ADD_ANIMATION                                                  a3.js
  ADD_COLLISION|REMOVE_COLLISION                                 a4.js
  ATACH_PLAYER|DEATACH_PLAYER                                    a5.js
  ADD_PARTICLE|                                                  a6.js
  ADD_TEXTBOX|REMOVE_TEXTBOX                                     a7.js
  ADD_WEBCAM                                                     a8.js
  SET_MAIN_INTERVAL                                              a9.js

==============================================================================



Right click contect menu on background:
```js
  new RIGHT_MENU_BUTTON("Add new gameObject ", 0, "1"),
  new RIGHT_MENU_BUTTON("Exit edit mode", 20, "2"),
  new RIGHT_MENU_BUTTON("Set render speed", 40, "3"),
  new RIGHT_MENU_BUTTON("Clear unsaved", 40, "6"),                              [UPGRADE 3.0.0]
  new RIGHT_MENU_BUTTON("Switch AutoConnect to true", 60, "4", "res/system/images/html5/HTML5-Offline-Storage.png"),
  new RIGHT_MENU_BUTTON("Switch EditorAutoRun to true", 80, "5", "res/system/images/html5/HTML5-Offline-Storage.png")],
```