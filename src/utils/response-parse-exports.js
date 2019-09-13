// 解析角色信息
const getRoleInfo = function(obj) {
  const rolename = obj['c']
  const rolelevel = obj['h']
  const tuituguanka = obj['k']
  const zuanshi = obj['f']
  const jinbi = obj['g']
  const wujingbi = obj['wujingbi']
  const yuanzhengBi = obj['yuanzhengBi']
  const tzSuiPian = obj['tzSuiPian']
  const jjcRongyu = obj['rongyu']
  const jjcTime = obj['jjcTime']
  const shenqiSuiPian = obj['shenqiSuiPian']
  const ronglian = obj['ronglian']
  const xuejing = obj['xuejing']
  const jiban = obj['jiban']

  const roleInfo = {
    rolename: rolename,
    rolelevel: rolelevel,
    tuituguanka: tuituguanka,
    zuanshi: zuanshi,
    jinbi: jinbi,
    wujingbi: wujingbi,
    yuanzhengBi: yuanzhengBi,
    tzSuiPian: tzSuiPian,
    jjcRongyu: jjcRongyu,
    jjcTime: jjcTime,
    shenqiSuiPian: shenqiSuiPian,
    ronglian: ronglian,
    xuejing: xuejing,
    jiban: jiban
  }
  return roleInfo
}

// 解析无尽炼狱结果
const wujin = function(obj) {
  const str = obj.c
  const yaoshuiType = {
    4000005: '力量药水',
    4000006: '智力药水',
    4000007: '敏捷药水',
    4000008: '体质药水',
    4000020: '韧性药水'
  }
  const b = obj.b // 1为挑战，2为扫荡
  let res = ''
  if (b === 1) {
    const strList = str.split('#')
    const jinbi = strList[0].split('|')[2]
    const jingyan = strList[1].split('|')[2]
    const yaoshui = yaoshuiType[strList[2].split('|')[1]]
    const yaoshuiNum = strList[2].split('|')[2]
    const wujinbi = strList[3].split('|')[2]
    res = '挑战无尽炼狱获得奖励: 金币' + jinbi + '，经验' + jingyan +
                '，' + yaoshui + '*' + yaoshuiNum + '，无尽币' + wujinbi
  } else if (b === 2) {
    const strList = str.split('#')
    const length = strList.length
    const yaocaiNum = strList[1].split('|')[2]
    const jinbi = strList[0].split('|')[2]
    const wujinbi = strList[length - 1].split('|')[2]
    res = '扫荡无尽炼狱获得：金币' + jinbi + '，无尽币' + wujinbi +
          ',力量药材*' + yaocaiNum + ',智力药材*' + yaocaiNum + '敏捷药材*' + yaocaiNum +
          ',体质药材*' + yaocaiNum + ',韧性药材*' + yaocaiNum
  }
  return res
}

// 解析推图结果
const boss = function(str) {
  const strList = str.split('#')
  const length = strList.length
  const zuanshi = strList[length - 1].split('|')[2]
  const jinbi = strList[length - 2].split('|')[2]
  const jingyan = strList[length - 3].split('|')[2]
  const res = '推图击杀BOSS获得奖励: 金币' + jinbi + '，经验' + jingyan + '，钻石' + zuanshi
  return res
}

// 解析每日副本
const meiriFuben = function(obj) {
  const fubenType = {
    1: '金币',
    5: '药草',
    10: '熔炼',
    14: '经验',
    18: '羁绊',
    19: '血精石'
  }
  const str = obj.c
  const b = obj.b // 1为挑战奖励，4为扫荡奖励
  let res = ''
  if (b === 1) {
    const strList = str.split('|')
    const fubenId = strList[0]
    const fubenName = fubenType[fubenId]
    if (fubenId !== '5') {
      const reward = strList[2]
      res = '击杀' + fubenName + '副本奖励：' + fubenName + '*' + reward
    } else {
      const yaocaoNum = str.split('#')[0].split('|')[2]
      res = '击杀' + fubenName + '副本奖励：' + '力量药草*' + yaocaoNum + ',智力药草*' + yaocaoNum +
      '敏捷药草*' + yaocaoNum + '体质药草*' + yaocaoNum + '韧性药草*' + yaocaoNum
    }
  } else if (b === 4) {
    res = '扫荡每日副本成功'
  }
  return res
}

// 解析恶魔副本
function parseJingyanshu(jingyanshu) {
  const jingyanshuType = {
    4000021: '小经验书',
    4000022: '中经验书',
    4000023: '大经验书'
  }
  const name = jingyanshuType[jingyanshu.split('|')[1]]
  const num = jingyanshu.split('|')[2]
  return { 'name': name, 'num': num }
}

const emeFuben = function(obj) {
  const str = obj.c
  const b = obj.b // 4为全部扫荡，2为挑战和单次扫荡(需要确认)
  let res = ''
  if (b === 4) {
    res = '扫荡恶魔巢穴成功'
  } else {
    const strList = str.split('|')
    const fubenId = strList[0]
    if (fubenId === '5') { // 5表示美女副本，32表示恶魔副本
      const meinvRewardList = str.split('#')
      const rewardSize = meinvRewardList.length
      if (rewardSize === 1) {
        const smallJingyanshu = parseJingyanshu(meinvRewardList[0])
        res = '击杀恶魔巢穴美女副本奖励：' + smallJingyanshu.name + '*' + smallJingyanshu.num
      } else if (rewardSize === 2) {
        const smallJingyanshu = parseJingyanshu(meinvRewardList[0])
        const middleJingyanshu = parseJingyanshu(meinvRewardList[1])
        res = '击杀恶魔巢穴美女副本奖励：' + smallJingyanshu.name + '*' + smallJingyanshu.num + ',' +
              middleJingyanshu.name + '*' + middleJingyanshu.num
      } else {
        const smallJingyanshu = parseJingyanshu(meinvRewardList[0])
        const middleJingyanshu = parseJingyanshu(meinvRewardList[1])
        const bigJingyanshu = parseJingyanshu(meinvRewardList[2])
        res = '击杀恶魔巢穴美女副本奖励：' + smallJingyanshu.name + '*' + smallJingyanshu.num + ',' +
              middleJingyanshu.name + '*' + middleJingyanshu.num + ',' +
              bigJingyanshu.name + '*' + bigJingyanshu.num
      }
    } else if (fubenId === '32') {
      const rewardNum = strList[2]
      res = '击杀恶魔巢穴恶魔副本奖励：神器碎片*' + rewardNum
    } else {
      const rewardNum = strList[2]
      res = '击杀恶魔巢穴亡灵副本奖励：套装碎片*' + rewardNum
    }
  }
  return res
}

// 解析恶魔巢穴购买攻打信息
/**
 *
 * @param {*} obj  返回的消息
 */
const emmFubenInfo = function(obj) {
  // 美女副本信息
  const buyjgTimes = obj['buyjgTimes']
  const jgLevel = obj['jgLevel']
  const jgTimes = obj['jgTimes']

  // 亡灵副本信息
  const buywlTimes = obj['buywlTimes']
  const wlTimes = obj['wlTimes']
  const wlLevel = obj['wlLevel']

  // 恶魔副本信息
  const buysqTimes = obj['buysqTimes']
  const sqTimes = obj['sqTimes']
  const sqLevel = obj['sqLevel']
  const res = '恶魔巢穴信息：' + '美女副本难度-' + jgLevel + ' ' + '购买次数-' + buyjgTimes + ' ' + '可打次数-' + jgTimes + ',' +
              '亡灵副本难度-' + wlLevel + ' ' + '购买次数-' + buywlTimes + ' ' + '可打次数-' + wlTimes + ',' +
              '美女副本难度-' + sqLevel + ' ' + '购买次数-' + buysqTimes + ' ' + '可打次数-' + sqTimes
  return res
}

// 解析商店信息
const shop = function(obj) {
  const jinbiShuaXin = obj.jinbiShuaXin
  return jinbiShuaXin
}

const laxiangguan = function(obj) {
  const str = obj.c
  let laxiangbi = 0
  const strList = str.split('#')
  const length = strList.length
  for (let i = 0; i < length; i++) {
    const lxb = parseInt(strList[i].split('|')[2])
    laxiangbi += lxb
  }
  const res = '获得蜡像币：' + laxiangbi
  return res
}

module.exports = {
  getRoleInfo,
  wujin,
  boss,
  meiriFuben,
  emeFuben,
  emmFubenInfo,
  shop,
  laxiangguan
}
