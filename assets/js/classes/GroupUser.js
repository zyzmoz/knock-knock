export class GroupUser {
  constructor(
    props = {
      userId,
      groupId,
      joined: false,
      joinedAt,
      invitedBy,
      invitedAt: new Date().toISOString(),
    }
  ) {
    return Object.assign(this, props);
  }
}
