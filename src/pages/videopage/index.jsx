import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { reqVideoById } from '@/services/video'
import ReactDOM from 'react-dom';
import { Typography, Tag, } from 'antd'
import { HighlightOutlined, SmileOutlined, SmileFilled } from '@ant-design/icons';

const { Title, Text, Link, Paragraph } = Typography;
import QierPlayer from 'qier-player';
const Index = ({ location }) => {
  const [] = useState(false);
  const [videoUrl, setvideoUrl] = useState(false);
  const [videoData, setvideoData] = useState({});
  useEffect(() => {




    const data = reqVideoById(location.query.id)

    data.then((res) => {
      console.log(res.data)
      const { url } = res.data.data
      setvideoData(res.data.data)
      setvideoUrl(url)
      console.log(videoUrl)

      // let player = document.querySelector('#player')
      // player.src = videoUrl

    })
  }, [videoUrl])

  function getLocalTime(nS) {
    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
  }
  console.log(videoData)
  return <div className={styles.mybox}>

    <div className={styles.mybox_left}>
      <Title level={4}>{videoData.title}</Title>
      <div style={{ marginBottom: 10 }}>
        {/* tag
       */}
        {videoData.tag && videoData.tag.map((item) => {
          return <Tag color="magenta">{item.name}</Tag>
        })}

        <span className={styles.createTime}>创建时间:{getLocalTime(videoData.created_at)}</span>
      </div>

      <QierPlayer srcOrigin={videoUrl} />
      <div style={{ marginTop: 15 }}>
        <Paragraph
        // copyable={{
        //   icon: [<SmileOutlined key="copy-icon" />, <SmileFilled key="copied-icon" />],
        //   tooltips: ['click here', 'you clicked!!'],
        // }}
        >
          {videoData.info}
        </Paragraph>
      </div>
    </div>

    <div className={styles.mybox_rigth}>
      Rigth
    </div>
  </div>
};
export default Index;