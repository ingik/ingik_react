const router = require("express").Router();

//model
const { User } = require('../models/User');
const { Follow } = require('../models/Follow');
const { Follower } = require('../models/Follower');
const { Notice } = require('../models/Notice');

//middleware
const { auth } = require('../middleware/auth');
const  upload  = require('../S3/upload');;


//User Register
router.post("/register", (req, res) => {
  const user = new User(req.body);

  User.findOne({ email: req.body.email }, (err, userEmail) => {
    if (!userEmail) {
      User.findOne({ name: req.body.name }, (err, userName) => {
        if (!userName) {
          user.save((err) => {
            if (err) return res.json({ success: false, err });
            // return res.status(200).json({ success: true })

            const follow = new Follow();
            follow.followerId = user._id;

            const follower = new Follower();
            follower.UserId = user._id;

            const notice = new Notice();
            notice.userId = user._id;

            follow.save((err) => {
              if (err) return res.json({ success: false, err });
              // res.status(200).json({ success: true })
            });

            follower.save((err) => {
              if (err) return res.json({ success: false, err });
              // return res.status(200).json({ success: true })
            });

            notice.save((err) => {
              if (err) return res.json({ success: false, err });
              return res.status(200).json({ success: true });
            });
          });
        } else if (err) {
          return res.status(500).send({ error: "namecheck failed" });
        } else if (user) return res.json({ namecheck: false });
      });
    } else if (err) {
      return res.status(500).send({ error: "emailcheck failed" });
    } else if (user) return res.json({ emailcheck: false });
  });
});

//User Login
router.post("/login", (req, res) => {
  console.log("email : " + req.body.email);

  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }

    //요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인.

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });

      //비밀번호까지 맞다면 토큰을 생성

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // 토큰을 저장한다. 쿠키 or 로컬스토리지 등등..
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

//User auth

router.get("/auth", auth, (req, res) => {
  //여기까지 미들웨어를 통과해 왔다는 얘기는 Authentication이 true라는 말.
  return res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.roll === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
    intro: req.user.intro,
  });
});

//User Logout

router.get("/logout", auth, (req, res) => {
  //미들웨어(auth)에서 user를 가지고옴
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
});

//User Find(Name)

router.post("/find", (req, res) => {
  console.log("userCHeck" + JSON.stringify(req.body));
  User.findOne({ name: req.body.username }, (err, user) => {
    if (err) return res.json({ check: false, err });
    return res.json(user);
  });
});

//User Find(_id)

router.get("/findId/:key", (req, res) => {
  console.log(req.params.key);
  User.findOne({ _id: req.params.key }, (err, user) => {
    if (err) return res.json({ findUser: false, err });
    return res.json(user);
  });
});

//User ImageUpdate
router.post(
  "/imageUpdate",
  upload.array("imageData"),
  (req, res, err) => {
    console.log("imagefiles[0] : " + JSON.stringify(req.files[0]));
    console.log("req.body.stringImage  : " + req.body.stringImage);

    imageDelete(req.body.stringImage);

    if (!req.files[0]) return res.json("no image");
    return res.json(req.files[0]);
  }
);

//User ProfileUpdate
router.post("/profileUpdate", auth, (req, res) => {
  const user = new User(req.body);
  let imageUrl = req.body.updateImage;
  user.image = imageUrl;

  console.log(req.body);

  if (
    req.body.emailBefore !== req.body.email &&
    req.body.nameBefore === req.body.name
  ) {
    User.findOne({ email: req.body.email }, (err, userEmail) => {
      if (err) return res.json({ check: false, err });
      if (!userEmail) {
        if (req.body.image !== req.body.imageBefore) {
          User.findOneAndUpdate(
            { _id: req.user._id },
            { $set: { image: user.image } },
            (err, user) => {
              if (err)
                return res.status(500).send({ error: "profileUpdate failure" });
            }
          );
        }

        User.findOneAndUpdate(
          { _id: req.user._id, name: req.user.name },
          { $set: { email: user.email, intro: user.intro } },
          (err, user) => {
            if (err)
              return res.status(500).send({ error: "profileUpdate failure" });
            return res.status(200).json({ success: true });
          }
        );
      }
      if (userEmail) return res.json({ emailcheck: false });
    });
  } else if (
    req.body.emailBefore === req.body.email &&
    req.body.nameBefore !== req.body.name
  ) {
    User.findOne({ name: req.body.name }, (err, userName) => {
      if (!userName) {
        if (req.body.image !== req.body.imageBefore) {
          User.findOneAndUpdate(
            { _id: req.user._id },
            { $set: { image: user.image } },
            (err, user) => {
              if (err)
                return res.status(500).send({ error: "profileUpdate failure" });
            }
          );
        }

        User.findOneAndUpdate(
          { _id: req.user._id, name: req.user.name },
          { $set: { name: user.name, intro: user.intro } },
          (err, user) => {
            if (err)
              return res.status(500).send({ error: "profileUpdate failure" });
            return res.status(200).json({ success: true });
          }
        );
      }
      if (err) return res.json({ check: false, err });
      if (userName) return res.json({ namecheck: false });
    });
  } else if (
    req.body.emailBefore !== req.body.email &&
    req.body.nameBefore !== req.body.name
  ) {
    User.findOne({ email: req.body.email }, (err, userEmail) => {
      if (!userEmail) {
        User.findOne({ name: req.body.name }, (err, userName) => {
          if (!userName) {
            if (req.body.image !== req.body.imageBefore) {
              User.findOneAndUpdate(
                { _id: req.user._id },
                { $set: { image: user.image } },
                (err, user) => {
                  if (err)
                    return res
                      .status(500)
                      .send({ error: "profileUpdate failure" });
                }
              );
            }

            User.findOneAndUpdate(
              { _id: req.user._id, name: req.user.name },
              {
                $set: { name: user.name, email: user.email, intro: user.intro },
              },
              (err, user) => {
                if (err)
                  return res
                    .status(500)
                    .send({ error: "profileUpdate failure" });
                return res.status(200).json({ success: true });
              }
            );
          }
          if (err) return res.json({ check: false, err });
          if (userName) return res.json({ namecheck: false });
        });
      }
      if (err) return res.json({ check: false, err });
      if (userEmail) return res.json({ emailcheck: false });
    });
  } else {
    if (req.body.image !== req.body.imageBefore) {
      User.findOneAndUpdate(
        { _id: req.user._id },
        { $set: { image: user.image } },
        (err, user) => {
          if (err)
            return res.status(500).send({ error: "profileUpdate failure" });
        }
      );
    }

    User.findOneAndUpdate(
      { _id: req.user._id, name: req.user.name },
      { $set: { name: user.name, email: user.email, intro: user.intro } },
      (err, user) => {
        if (err)
          return res.status(500).send({ error: "profileUpdate failure" });
        return res.status(200).json({ success: true });
      }
    );
  }
});

//User socket Update
router.post("/authSocketUpdate", (req, res) => {
  User.findOneAndUpdate(
    { _id: req.body.userId },
    { $set: { socketId: req.body.socketId } },
    (err, user) => {
      if (err) return res.status(500).send({ error: "socketUpdate failure" });
      return res.status(200).json(user);
    }
  );
});

//User list
router.post("/list", (req, res) => {
  User.find(
    {
      $or: [
        { name: { $regex: req.body.name } },
        { intro: { $regex: req.body.name } },
      ],
    },
    (err, user) => {
      console.log(user);
      if (err) return res.status(500).send({ error: "database failure" });
      return res.status(200).json(user);
    }
  );
});

//Following
router.post("/following", (req, res) => {
  Follow.findOneAndUpdate(
    { followerId: req.body.followerId },
    {
      $push: {
        following: {
          followingId: req.body.followingId,
        },
      },
    },
    (err, follow) => {
      // if (err) return res.status(500).send({ error: "Following failure" });
      console.log(follow);

      Follower.findOneAndUpdate(
        { UserId: req.body.followingId },
        {
          $push: {
            Myfollowing: {
              MyfollowingId: req.body.followerId,
            },
          },
        },
        (err, follower) => {
          if (err) return res.status(500).send({ error: "Follower failure" });
          return res.status(200).send(follower);
        }
      );
    }
  );
});

//UnFollowing
router.post("/unfollowing", (req, res) => {
  Follow.findOneAndUpdate(
    { followerId: req.body.followerId },
    {
      $pull: {
        following: {
          followingId: req.body.followingId,
        },
      },
    },
    (err, follow) => {
      // if (err) return res.status(500).send({ error: "UnFollowing failure" });
      // return res.status(200).send(follow);
      console.log(follow);
      Follower.findOneAndUpdate(
        { UserId: req.body.followingId },
        {
          $pull: {
            Myfollowing: {
              MyfollowingId: req.body.followerId,
            },
          },
        },
        (err, follower) => {
          if (err) return res.status(500).send({ error: "UnFollower failure" });
          return res.status(200).send(follower);
        }
      );
    }
  );
});

//FollowCheck
router.post("/followCheck", (req, res) => {
  console.log("followCheck" + req.body.followerId);
  console.log("followCheck" + req.body.followingId);

  Follow.findOne(
    {
      followerId: req.body.followerId,
      following: { followingId: req.body.followingId },
    },
    (err, follow) => {
      if (err) return res.status(500).send({ error: "followCheck failure" });
      return res.status(200).send(follow);
    }
  );
});

//FollowLength

router.get("/followLength/:key", (req, res) => {
  Follow.find({ followerId: req.params.key }, (err, follow) => {
    if (err) return res.status(500).send({ error: "followLength failure" });
    return res.status(200).send(follow);
  });
});

//FollowerLength

router.get("/followerLength/:key", (req, res) => {
  Follower.find({ UserId: req.params.key }, (err, follower) => {
    if (err) return res.status(500).send({ error: "followerLength failure" });
    return res.status(200).send(follower);
  });
});

//FollowList

router.get("/followList/:key", (req, res) => {
  Follow.findOne({ followerId: req.params.key }, (err, follow) => {
    if (err) return res.status(500).send({ error: "followLength failure" });
    return res.status(200).send(follow);
  });
});

//FollwerList

router.get("/followerList/:key", (req, res) => {
  Follower.findOne({ UserId: req.params.key }, (err, follower) => {
    if (err) return res.status(500).send({ error: "followerLength failure" });
    return res.status(200).send(follower);
  });
});

module.exports = router;
