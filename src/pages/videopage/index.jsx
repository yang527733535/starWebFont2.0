import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { reqVideoById } from '@/services/video'
import ReactDOM from 'react-dom';

import QierPlayer from 'qier-player';
const Index = ({ location }) => {
  const [] = useState(false);
  const [videoUrl, setvideoUrl] = useState(false);
  useEffect(() => {
    // console.log(location.query.id)
    const data = reqVideoById(location.query.id)
    data.then((res) => {
      console.log(res)
      const { url } = res.data.data
      console.log('url: ', url);

      setvideoUrl(url)
      console.log(videoUrl)

      // let player = document.querySelector('#player')
      // player.src = videoUrl

    })
  }, [videoUrl])



  return <div className={styles.mybox}>

    <div className={styles.mybox_left}>
      <QierPlayer srcOrigin={videoUrl} />
      {/* <video
        id="player"
        controls="controls"
        style={{ width: "100%", heigth: "100%" }}
        src={videoUrl}></video > */}
    </div>

    <div className={styles.mybox_rigth}>
      Rigth
    </div>
  </div>
};
export default Index;