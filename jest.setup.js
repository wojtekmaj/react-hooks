global.MediaQueryListEvent = class MediaQueryListEvent extends Event {
  constructor(type, eventInitDict) {
    super(type, eventInitDict);
    this.matches = eventInitDict.matches;
  }
};
