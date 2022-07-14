import { Group } from "../classes/Group.js";
import {
  createOrUpdateData,
  findMany,
  userAuthState,
} from "../integrations/firebase.js";
import { whereIn } from "../utils/queryUtils.js";

export const groupsCtrl = async () => {
  let groups = [];

  await findMany("groups", (res) => {
    const groupsIds = Object.keys(res);
    groups = groupsIds
      .map((id) => ({ id, ...res[id] }))
      .filter((g) => g.invitedUsers?.some((s) => s === userAuthState?.uid));

    const gList = document.getElementById("groupList");

    if (groups.length > 0 && gList) {
      gList.innerHTML = "";
    }

    gList &&
      groups.map((group) => {
        gList.appendChild(createGroupItemDiv(group));
      });

    selectGroup(groups[0]?.id);
  });

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

  let selectedGroupId;
  const selectGroup = async (groupId) => {
    const group = groups.find((g) => g.id === groupId);
    console.log(group);
    groupFeedName.innerHTML = group.groupName;
    selectedGroupId = group.id;
  };

  const createGroupItemDiv = (group) => {
    const groupBtn = document.createElement("div");
    groupBtn.className = "group-list-item";
    groupBtn.innerHTML = group.groupName;
    groupBtn.addEventListener("click", () => {
      selectGroup(group.id);
    });

    return groupBtn;
  };

  submitGroupMessageBtn.addEventListener("click", () => {
    if (groupMessage.trim() === "") {
      return;
    }

    const message = {
      sentBy: userAuthState?.id,
      sentAt: new Date().toDateString(),
      message: groupMessage.value,
    };

    createOrUpdateData("groups", selectedGroupId, message);
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
      const invited = Object.keys(res).filter((r) =>
        whereIn(res[r].email, participants)
      );
      console.log({ invited });
      const group = new Group({
        groupName: groupName.value,
        invitedUsers: invited,
        partitipants: [userAuthState?.uid],
        createdBy: userAuthState?.uid,
      });
      console.log("Create Group", group);
      const { error } = await createOrUpdateData("groups", null, group);
      console.log({ error });
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
