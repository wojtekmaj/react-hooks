globalThis.MediaQueryListEvent = class MediaQueryListEvent extends Event {
  matches: boolean;
  media: string;

  constructor(type: string, eventInitDict?: MediaQueryListEventInit) {
    super(type, eventInitDict);
    this.matches = eventInitDict?.matches ?? false;
    this.media = eventInitDict?.media ?? '';
  }
};
