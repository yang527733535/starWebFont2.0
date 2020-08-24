import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { Card } from 'antd'
import { history } from 'umi';
import { videoList } from '@/services/video'
const { Meta } = Card;
const Index = () => {
  const [videos, setvideos] = useState([]);
  useEffect(() => {
    async function GetVideo() {
      const data = await videoList()
      console.log('data: ', data);
      const { videolist } = data.data
      setvideos(videolist)
    }
    GetVideo()

  }, [])
  return (
    <div className={styles.mybox}>
      {
        videos.map((item) => {
          return (
            <Card
              onClick={() => {
                history.push({
                  pathname: '/test/videopage',
                  query: {
                    id: item.id,
                  },
                });
              }}
              key={item.id}
              hoverable
              style={{ width: 250, marginRight: 20, marginBottom: 20 }}
              cover={<img
                style={{ width: 250, height: 160 }}
                // avatar
                alt="example"
                src={item.avatar === "" ? "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" : item.avatar}
              />}
            >
              <Meta title={item.title} description={item.info} />
            </Card>
          )
        })
      }

    </div>
  )
};
export default Index;
