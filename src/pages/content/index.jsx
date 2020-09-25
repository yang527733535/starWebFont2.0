import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { Card, Spin } from 'antd'
import { history } from 'umi';
import { videoList } from '@/services/video'
const { Meta } = Card;



const Index = () => {
  useEffect(() => {
    document.title = '首页'
  }, [])
  const [videos, setvideos] = useState([]);
  const [loading, seloadingt] = useState(false)
  useEffect(() => {
    async function GetVideo() {
      seloadingt(true)
      const data = await videoList()
      console.log('data: ', data);
      const { videolist } = data.data
      seloadingt(false)
      setvideos(videolist)
    }
    GetVideo()

  }, [])
  return (
    <div className={styles.mybox}>
      {  loading && <Spin className={styles.myspin} />}
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
              <Meta

                title={item.title} description={item.info} />
            </Card>
          )
        })
      }

    </div>
  )
};
export default Index;
