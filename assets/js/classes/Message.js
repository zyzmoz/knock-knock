export class Message {
  constructor(
    props = {
      sentBy,
      sentAt: new Date().toISOString(),
      message: "",
      groupId: null,
      listingId: null,
    }
  ) {
    return Object.assign(this, props);
  }
}

