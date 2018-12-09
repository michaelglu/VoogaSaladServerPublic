const { User } = require("./../Models/User.js");
const bcrypt = require("bcryptjs"); //used for hashing passwords
// Function to create a new user
const createUser = userdata => {
  return new Promise((resolve, reject) => {
    User.findOne({ email: userdata.email }).then(
      doc => {
        if (!doc) {
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(userdata.password, salt, (err, hash) => {
              userdata.password = hash;
              const user = new User(userdata);
              user.save().then(
                () => {
                  resolve("success");
                },
                error => {
                  reject(error);
                }
              );
            });
          });
        } else {
          reject("User already exists");
        }
      },
      error => {
        reject(error);
      }
    );
  });
};
// Function to find users
const findUsers = name => {
  return new Promise((resolve, reject) => {
    User.find({ name: name }).then(
      users => {
        if (!users) {
          resolve();
        } else {
          users.forEach(user => {
            user.password = null;
          });
          resolve(users);
        }
      },
      error => {
        reject(error);
      }
    );
  });
};
// Function to folow user
const followUser = userdata => {
  return new Promise((resolve, reject) => {
    User.findOne({ email: userdata.target }).then(
      user => {
        if (!user) {
          reject({ message: "no user found" });
        } else if (user.followers.includes(userdata.follower)) {
          reject({ message: "already following" });
        } else {
          user.followers.push(userdata.follower);
          user.save().then(
            success => {
              User.findOne({ email: userdata.follower }).then(
                follower => {
                  if (!follower) {
                    reject({ message: "no follower found" });
                  } else {
                    follower.following.push(userdata.target);
                    follower.save().then(
                      success => {
                        resolve(follower.following);
                      },
                      error => {
                        reject(error);
                      }
                    );
                  }
                },
                error => {
                  reject(error);
                }
              );
            },
            error => {
              reject(error);
            }
          );
        }
      },
      error => {
        reject(error);
      }
    );
  });
};
//Function to login user
const login = userdata => {
  return new Promise((resolve, reject) => {
    User.findOne({ email: userdata.email }).then(user => {
      if (!user) {
        reject({ message: "no user found" });
      } else {
        bcrypt.compare(userdata.password, user.password, (error, res) => {
          if (error) {
            reject(error);
          }
          if (res) {
            user.password = null;
            resolve(user);
          }
        });
      }
    });
  });
};
//Function to update User Data
const updateUser = userdata => {
  return new Promise((resolve, reject) => {
    User.findOne({ email: userdata.email }).then(user => {
      if (!user) {
        reject({ message: "no user found" });
      } else {
        bcrypt.compare(userdata.password, user.password, (error, res) => {
          if (error) {
            reject(error);
          }
          if (res) {
            user.bio = userdata.bio;
            user.name = userdata.name;
            user.email = userdata.email;
            user.save().then(
              () => {
                resolve({ email: user.email, name: user.name, bio: user.bio });
              },
              error => {
                reject(error);
              }
            );
          }
        });
      }
    });
  });
};

module.exports = { createUser, login, updateUser, findUsers, followUser };
