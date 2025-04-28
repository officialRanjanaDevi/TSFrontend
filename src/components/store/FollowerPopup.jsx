import React from "react";
import { Drawer, List, Avatar, Button } from "antd";

const FollowerPopup = ({ followers, visible, onClose }) => {
  const { followers: followersData } = followers;

  return (
    <Drawer
      title="Followers"
      placement="right"
      closable={true}
      onClose={onClose}
      visible={visible}
      width={350}
      bodyStyle={{ padding: 0 }}
    >
      <List
        dataSource={followersData}
        renderItem={(follower) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  src={follower.profilePic?.url || "/images/man.png"}
                  alt={follower.name}
                />
              }
              title={follower.name}
            />
          </List.Item>
        )}
        locale={{ emptyText: "No followers found." }}
        style={{ padding: "16px" }}
      />
    </Drawer>
  );
};

export default FollowerPopup;
