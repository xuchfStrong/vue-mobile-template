// 解析角色信息
export function getRoleInfo(obj) {
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
export function wujin(obj) {
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
export function boss(obj) {
  const str = obj.c
  const b = obj.b // b=1为推图结果和血战奖励，b=5为离线奖励
  let res = ''
  const strList = str.split('#')
  const length = strList.length
  if (b === 1) {
    if (length === 1) { // 血战奖励
      const jingjibi = strList[0].split('|')[2]
      res = '竞技场获得: 竞技币' + jingjibi
    } else if (length === 2) { // 血战奖励
      const jinbi = strList[1].split('|')[2]
      const jingjibi = strList[0].split('|')[2]
      res = '血战竞技获得: 金币' + jinbi + '，竞技币' + jingjibi
    } else {
      const zuanshi = strList[length - 1].split('|')[2]
      const jinbi = strList[length - 2].split('|')[2]
      const jingyan = strList[length - 3].split('|')[2]
      res = '推图击杀BOSS获得奖励: 金币' + jinbi + '，经验' + jingyan + '，钻石' + zuanshi
    }
  } else if (b === 5) {
    const jinbi = strList[length - 2].split('|')[2]
    const jingyan = strList[length - 1].split('|')[2]
    res = '离线获得: 金币' + jinbi + '，经验' + jingyan
  }
  return res
}

// 解析每日副本
export function meiriFuben(obj) {
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

export function emeFuben(obj) {
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
export function emeFubenInfo(obj) {
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

// 解析金币商店物品ID信息
export function jinbiShop(id) {
  const goods = {
    101: '哥布林勇士',
    102: '骷髅射手',
    103: '骷髅法师',
    104: '沼泽巨鳄',
    105: '腐化怒熊',
    106: '狼人勇士',
    107: '吸血蝙蝠',
    108: '哥布林',
    109: '骷髅兵',
    110: '魔狼',
    111: '力量药草',
    112: '智力药草',
    113: '敏捷药草',
    114: '体质药草',
    115: '韧性药草'
  }
  return goods[id]
}

// 解析挂机信息
export function guaji(obj) {
  const str = obj.c
  let res = ''
  const strList = str.split('#')
  const jinbi = strList[strList.length - 2].split('|')[2]
  const jingyan = strList[strList.length - 1].split('|')[2]
  res = '挂机获得：金币' + jinbi + ',经验' + jingyan
  return res
}

// 解析商店已经购买信息
export function hadBuyInfo(obj) {
  const res = {
    hadBuyJinbi: false
  }
  const hadBuys = obj.hadBuys
  const jinbiShopIds = [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115]
  for (let i = 0; i < jinbiShopIds.length; i++) {
    const id = jinbiShopIds[i]
    if (hadBuys.indexOf(id) !== -1) {
      res.hadBuyJinbi = true
      break
    }
  }
  return res
}

// 血战奖励
export function xuezhan(obj) {
  const str = obj.c
  let res = ''
  const strList = str.split('#')
  const key = strList[0].split('|')[2]
  if (key === 1) {
    const jinbi = strList[0].split('|')[2]
    const jingjibi = strList[1].split('|')[2]
    const jiban = strList[2].split('|')[2]
    res = '领取血战竞技奖励：金币' + jinbi + ',竞技币' + jingjibi + ',羁绊' + jiban
  } else if (key === 4) {
    const jingjibi = strList[0].split('|')[2]
    const zuanshi = strList[1].split('|')[2]
    const jinbi = strList[2].split('|')[2]
    res = '领取竞技场奖励：金币' + jinbi + ',竞技币' + jingjibi + ',钻石' + zuanshi
  }
  return res
}

// 世界BOSS奖励
export function shijieboss(obj) {
  const str = obj.c
  const b = obj.b // b=3为挑战奖励，b=4为领取奖励
  let res = ''
  const strList = str.split('#')
  if (b === 3) {
    const jinbi = strList[0].split('|')[2]
    const ronglian = strList[1].split('|')[2]
    const jiban = strList[2].split('|')[2]
    res = '挑战世界BOSS奖励：金币' + jinbi + ',熔炼' + ronglian + ',羁绊' + jiban
  } else if (b === 4) {
    const jinbi = strList[0].split('|')[2]
    const jiban = strList[1].split('|')[2]
    res = '领取世界BOSS奖励：金币' + jinbi + ',羁绊' + jiban
  }

  return res
}

// 蜡像馆任务奖励
export function laxiangguanTaskReward(obj) {
  const str = obj.c
  const laxiangbi = str.split('|')[2]
  const res = '获得蜡像币：' + laxiangbi
  return res
}

// 蜡像馆获得
export function laxiangguan(obj) {
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

// 十连抽结果
export function shilianchou(obj) {
  const heroMap = {
    80500001: '索菲亚*守望',
    80500002: '群山之主',
    80500003: '忠诚的布鲁斯',
    80500004: '残暴屠戮者罗杰',
    80500005: '大魔导师麦格尼',
    80500006: '锻造宗室埃斯特罗',
    80500007: '卫斯理*贝鲁亚',
    80500008: '寒冰风暴艾米莉亚',
    80500009: '醋坛子罗曼蒂妮',
    80500010: '龙后梅里塔萨',
    80500011: '复国者阿姆',
    80500012: '烈焰使者安东尼',
    80500013: '女妖统领花簇',
    80500014: '恶魔领主库卡',
    80500015: '梦魇龙克兹拉特',
    80500016: '猪人酋长阿呆'
  }
  let res = '本次十连抽获得ss英雄：'
  const str = obj.c
  const strList = str.split('#')
  const length = strList.length
  const ssHero = []
  for (let i = 0; i < length; i++) {
    const hero = strList[i].split('|')[1]
    const heroId = parseInt(hero)
    if (heroId in heroMap) {
      ssHero.push(heroId)
      const heroName = heroMap[heroId]
      res = res + heroName + ' '
    }
  }
  if (ssHero.length === 0) {
    res = '本次十连抽没有获得ss英雄'
  }
  return res
}

// 计算角色战力
export function calcZhanli(obj) {
  const heros = obj.heros
  let zhanli = 0
  if (heros.length <= 6) {
    heros.forEach(element => {
      zhanli += element.zhanli
    })
  }
  return zhanli
}

// 竞技场信息
export function calcJjcInfo(obj) {
  const res = {}
  res.jjcWinTime = obj.winTime
  res.jjcLoseTime = obj.loseTime
  res.jjcLinkWinTime = obj.linkWinTime
  res.todayAttackTimes = obj.todayAttackTimes
  res.winIds = obj.winIds
  res.roleList = obj.roleList
  return res
}
