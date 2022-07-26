import { Group } from "../classes/Group.js";
import {
  createOrUpdateData,
  findMany,
  getAuthState,
  getUser,
  userAuthState,
} from "../integrations/firebase.js";
import { whereIn } from "../utils/queryUtils.js";
let selectedGroupId;
export const groupsCtrl = async () => {
  let groups = [];
  groupFeedParticipants.innerHTML = "";

  const selectGroup = async (groupId) => {
    const group = groups.find((g) => g.id === groupId);
    groupFeedParticipants.innerHTML = null;
    groupFeedName.innerHTML = group?.groupName;
    groupFeedParticipants.innerHTML = "";
    selectedGroupId = group?.id;
    groupFeedMessages.innerHTML = ""
    group?.participants?.map(async (id) => {
      const user = await getUser(id);
      groupFeedParticipants.innerHTML += `${user.firstName},`;
    });

    group?.messages?.map(async (m) => {
      const el = await createMessageDiv(m);
      console.log(el);
      groupFeedMessages.appendChild(el);
    });
  };

  findMany("groups", async (res) => {
    await getAuthState();
    console.log(userAuthState?.uid);
    groups = res.filter((g) =>
      g.participants?.some((s) => s === userAuthState?.uid)
    );

    const gList = document.getElementById("groupList");
    gList.innerHTML = "";

    if (groups.length > 0 && gList) {
      gList.innerHTML = "";
    }

    gList &&
      groups.map((group) => {
        gList.appendChild(createGroupItemDiv(group));
      });

    if (groups && groups.length > 0) {
      selectGroup(selectedGroupId || groups[0]?.id);
    }
  });

  const createMessageDiv = async (message) => {
    const user = await getUser(message?.sentBy);
    await getAuthState();
    let messageDiv = document.createElement("div");
    if (message?.sentBy === userAuthState?.uid) {
      messageDiv.className = "group-feed-message me";
    } else {
      messageDiv.className = "group-feed-message";
    }

    let messageFigure = document.createElement("figure");
    messageFigure.className = "avatar";

    let avatarImg = document.createElement("img");
    avatarImg.src = `${user.photoUrl}`;

    messageFigure.appendChild(avatarImg);

    let messageContentDiv = document.createElement("div");
    messageContentDiv.className = "group-feed-message-content";

    let messageContentB = document.createElement("b");
    messageContentB.className = "group-user";
    messageContentB.innerHTML = `${user.firstName} ${user.lastName}`;

    let messageContentP = document.createElement("div");
    messageContentP.className = "group-message";
    messageContentP.innerHTML = message.message;

    messageContentDiv.appendChild(messageContentB);
    messageContentDiv.appendChild(messageContentP);

    messageDiv.appendChild(messageFigure);
    messageDiv.appendChild(messageContentDiv);

    return messageDiv;
  };

  const createGroupItemDiv = (group) => {
    const groupBtn = document.createElement("div");
    groupBtn.className = "group-list-item";
    groupBtn.innerHTML = group?.groupName;
    groupBtn.addEventListener("click", () => {
      selectGroup(group.id);
    });

    return groupBtn;
  };

  searchGroups.addEventListener("input", (e) => {
    const gList = document.getElementById("groupList");

    if (groups.length > 0 && gList) {
      gList.innerHTML = "";
    }
    console.log(e);
    gList &&
      groups
        .filter((f) => f.groupName.includes(searchGroups.value))
        .map((group) => {
          gList.appendChild(createGroupItemDiv(group));
        });
  });

  submitGroupMessageBtn.addEventListener("click", async () => {
    if (groupMessage.value.trim() === "") {
      return;
    }

    getAuthState(async (res) => {
      const message = {
        sentBy: userAuthState?.uid,
        sentAt: new Date().toDateString(),
        message: groupMessage.value,
      };
      let group = groups.find((g) => g.id === selectedGroupId);
      if (group.messages) {
        group.messages.push(message);
      } else {
        group.messages = [message];
      }

      console.log(group);
      groupFeedMessages.innerHTML = "";

      groupFeedParticipants.innerHTML = "";
      groups = [];
      groupMessage.value = "";
      await createOrUpdateData("groups", selectedGroupId, group);
    });
  });

  createGroupButton.addEventListener("click", () => {
    createGroupsModal.classList.toggle("is-open");
  });

  submitGroupCreationBtn.addEventListener("click", async (evt) => {
    const participants = String(groupParticipants.value + ",")
      .split(",")
      .map((i) => i.trim());

    await findMany("users", async (res) => {
      console.log(res);
      const invited = res
        .filter((r) => whereIn(r.email, participants))
        .map((m) => m.id);

      console.log(userAuthState?.uid);
      const group = new Group({
        groupName: groupName.value,
        invitedUsers: invited,
        participants: [userAuthState?.uid, ...invited],
        createdBy: userAuthState?.uid,
      });
      const { error } = await createOrUpdateData("groups", null, group);
    });

    evt.preventDefault();
    createGroupsModal.classList.toggle("is-open");
  });

  cancelGroupCreationBtn.addEventListener("click", (evt) => {
    evt.preventDefault();
    console.log("Cancel Create Group");
    createGroupsModal.classList.toggle("is-open");
  });

  // close modal
  createGroupsModal.addEventListener("click", (e) => {
    if (e.target.classList.toString().includes("modal")) {
      createGroupsModal.classList.remove("is-open");
    }
  });
};
