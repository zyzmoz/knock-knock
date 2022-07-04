export class Group {
  constructor(
    props = {
      createdBy,
      createtAt: new Date().toISOString(),
      groupName,
      invitedUsers: [], // array of user ids
      partitipants: [] // array of users that joined the group
    }
  ) {
    return Object.assign(this, props);
  }
}
