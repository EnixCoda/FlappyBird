/**
 *          ^ y
 *          |       |    |
 *          |       |    |
 *   +---+  |       |    |
 *   |   |  |       +----+
 *   +---+  |
 *   bird   |        tube
 *          |       +----+
 *          |       |    |
 *          |       |    |
 *          |       |    |
 *  --------+-------+----+-----> x
 *  +-------|----------------
 *  |       |  ground
 *  +-------|----------------
 *          |
 */

const CONFIG = {
  TIME_SCALE: 1.2
}

CONFIG.calculate = () => {
  CONFIG.WINDOW_WIDTH = window.innerWidth
  CONFIG.WINDOW_HEIGHT = window.innerHeight

  CONFIG.TEN_PERCENT_HEIGHT = Math.round(CONFIG.WINDOW_HEIGHT * 0.1)
  CONFIG.GROUND_HEIGHT = CONFIG.TEN_PERCENT_HEIGHT

  // 小鸟：
  // 小鸟从窗口顶部坠落至底的耗时（无视体积）
  CONFIG.FREE_FALL_TIME = CONFIG.TIME_SCALE * 625,
  // 小鸟每次摆翅获得的上升运动时间
  CONFIG.STRUGGLE_TIME = CONFIG.FREE_FALL_TIME / 2.5
  CONFIG.GRAVITY = -CONFIG.WINDOW_HEIGHT / (Math.pow(CONFIG.FREE_FALL_TIME, 2) * 0.5)
  // 摆持瞬间的垂直速度
  CONFIG.BIRD_FLAP_SPEED = -CONFIG.GRAVITY * CONFIG.STRUGGLE_TIME
  // 水平移动速度
  CONFIG.FORWARD_SPEED = CONFIG.BIRD_FLAP_SPEED * 0.3
  // 大小
  CONFIG.BIRD_HEIGHT = CONFIG.TEN_PERCENT_HEIGHT * 1.1
  CONFIG.BIRD_WIDTH = CONFIG.TEN_PERCENT_HEIGHT * 1.1
  // 初始位置
  CONFIG.BIRD_PRESET_POS_X = Math.round(CONFIG.WINDOW_HEIGHT * 0.25)
  CONFIG.BIRD_PRESET_POS_Y = Math.round(CONFIG.WINDOW_HEIGHT * 0.5)
  // 小鸟撞击水管后的瞬间垂直速度
  CONFIG.BIRD_DEAD_STRUGGLE_UP_SPEED = CONFIG.FREE_FALL_TIME / 625

  // 水管：
  // 最低的下半部分管口高度
  CONFIG.TUBE_MINIMUM_BOTTOM_EDGE = CONFIG.TEN_PERCENT_HEIGHT
  CONFIG.TUBE_WIDTH = Math.round(CONFIG.BIRD_WIDTH * 1.3)
  // 水管的开口高度最大变化量
  CONFIG.TUBE_SPACE_RANGE = CONFIG.TEN_PERCENT_HEIGHT * 4
  // 水管的开口间距
  CONFIG.TUBE_SPACE_HEIGHT = Math.round(CONFIG.BIRD_WIDTH + Math.pow(CONFIG.BIRD_FLAP_SPEED, 2) / Math.abs(CONFIG.GRAVITY) / 2 * 1.5)
  // 各对水管的水平距离
  CONFIG.TUBE_SPACE_BETWEEN = Math.round(Math.max((CONFIG.BIRD_FLAP_SPEED + Math.sqrt(Math.pow(CONFIG.BIRD_FLAP_SPEED, 2) + CONFIG.TUBE_SPACE_RANGE * Math.abs(CONFIG.GRAVITY))) * CONFIG.FORWARD_SPEED / Math.abs(CONFIG.GRAVITY), CONFIG.BIRD_WIDTH / 2 + CONFIG.TUBE_SPACE_RANGE * CONFIG.FORWARD_SPEED / CONFIG.FORWARD_SPEED))
  // 第一根水管的水平起始位置
  CONFIG.OFFSET_TUBE = CONFIG.BIRD_PRESET_POS_X + CONFIG.TUBE_SPACE_BETWEEN * 2
}

export default CONFIG
