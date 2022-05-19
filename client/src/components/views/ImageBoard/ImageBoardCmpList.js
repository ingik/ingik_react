import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { withRouter } from "react-router-dom";
import ImageBoard from "./ImageBoard";

import "./ImageBoard.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import { CircularProgress } from "@mui/material";

function ImageBoardCmpList() {
  let number = 1;
  const target = useRef(null);
  const viewport = useRef(null);

  const [DataList, setDataList] = useState([]);
  const mediaQuery = useMediaQuery("(min-width:641px)");

  const [DataLess, setDataLess] = useState(null);

  useEffect(() => {
    let CleanUpBoolean = true;
    axios.get("/api/boards/imageBoardListCmp").then((response) => {
      const value = [];

      // eslint-disable-next-line array-callback-return
      response.data.map((list) => {
        axios
          .get("/api/boards/recommandLength/" + list._id)
          .then((response) => {
            console.log(response.data);
            list.recommand = response.data[0]?.recommand;
          });
        value.push(list);
      });
      if (CleanUpBoolean) {
        setDataList(value);
      }
    });

    return () => {
      CleanUpBoolean = false;
    };
  }, []);

  useEffect(() => {
    let io;
    if (target.current) {
      console.log("intersection observe");
      const options = {
        root: viewport.current,
        threshold: 0,
      };

      const handleintersection = (entries, observer) => {
        console.log(entries);
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }
          loadItems();

          observer.unobserve(entry.target);
          if (!DataLess) {
            setTimeout(() => {
              ++number;
              if (target.current) observer.observe(target.current);
            }, 1000);
          }
        });
      };

      io = new IntersectionObserver(handleintersection, options);

      if (target.current) {
        io.observe(target.current);
      }
    }

    return () => {
      io && io.disconnect();
      setDataList(null);
    };
  }, [target, viewport]);

  const loadItems = () => {
    console.log("loadItems");

    axios.get("/api/boards/imageBoardListCmp/" + number).then((response) => {
      if (response.data.length === 0) {
        setDataLess(true);
        return console.log("last data");
      }

      // eslint-disable-next-line array-callback-return
      response.data.map((list) => {
        axios
          .get("/api/boards/recommandLength/" + list._id)
          .then((response) => {
            console.log(response.data);
            async function push() {
              list.recommand = response.data[0]?.recommand;
            }
            push().then(() => {
              // value.push(list);
              setDataList((prevState) => {
                return [...prevState, list];
              });
            });
          });
      });
    });
  };

  return (
    <div
      className="CmpList"
      style={{ paddingTop: "64px", height: "100%" }}
      ref={viewport}
    >
      <div
        className="viewport"
        style={{ width: "100%", height: "90vh", overflow: "auto" }}
      >
        {DataList &&
          DataList.map((item, index) => {
            // let lastEl = index === DataList.length - 1
            return (
              <div
                key={index}
                className={mediaQuery ? `cmpBox` : `cmpBoxSmall`}
                // ref={lastEl ? target : null}
              >
                <div className={mediaQuery ? `card` : null}>
                  <ImageBoard paramKey={item._id} contentPosition={false} />
                </div>
              </div>
            );
          })}
        {DataList ? (
          <div
            style={{ width: "100%", height: "300px", position: "relative" }}
            ref={target}
          >
            {DataLess ? null : (
              <CircularProgress
                sx={{
                  position: "absolute",
                  top: "calc(50% - 20px)",
                  left: "calc(50% - 20px)",
                }}
              />
            )}
          </div>
        ) : (
          <div ref={DataList ? target : null} />
        )}
      </div>
    </div>
  );
}

export default withRouter(ImageBoardCmpList);
