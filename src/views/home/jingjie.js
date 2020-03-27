const jingjieMap = {
  1: '感应境1阶',
  2: '感应境2阶',
  3: '感应境3阶',
  4: '感应境4阶',
  5: '感应境5阶',
  6: '感应境6阶',
  7: '感应境7阶',
  8: '感应境8阶',
  9: '感应境9阶',
  10: '感应境10阶',
  11: '灵动境1阶',
  12: '灵动境2阶',
  13: '灵动境3阶',
  14: '灵动境4阶',
  15: '灵动境5阶',
  16: '灵动境6阶',
  17: '灵动境7阶',
  18: '灵动境8阶',
  19: '灵动境9阶',
  20: '灵动境10阶',
  21: '灵轮境1阶',
  22: '灵轮境2阶',
  23: '灵轮境3阶',
  24: '灵轮境4阶',
  25: '灵轮境5阶',
  26: '灵轮境6阶',
  27: '灵轮境7阶',
  28: '灵轮境8阶',
  29: '灵轮境9阶',
  30: '灵轮境10阶',
  31: '神魄境1阶',
  32: '神魄境2阶',
  33: '神魄境3阶',
  34: '神魄境4阶',
  35: '神魄境5阶',
  36: '神魄境6阶',
  37: '神魄境7阶',
  38: '神魄境8阶',
  39: '神魄境9阶',
  40: '神魄境10阶',
  41: '融天境1阶',
  42: '融天境2阶',
  43: '融天境3阶',
  44: '融天境4阶',
  45: '融天境5阶',
  46: '融天境6阶',
  47: '融天境7阶',
  48: '融天境8阶',
  49: '融天境9阶',
  50: '融天境10阶',
  51: '化天境1阶',
  52: '化天境2阶',
  53: '化天境3阶',
  54: '化天境4阶',
  55: '化天境5阶',
  56: '化天境6阶',
  57: '化天境7阶',
  58: '化天境8阶',
  59: '化天境9阶',
  60: '化天境10阶',
  61: '通天境1阶',
  62: '通天境2阶',
  63: '通天境3阶',
  64: '通天境4阶',
  65: '通天境5阶',
  66: '通天境6阶',
  67: '通天境7阶',
  68: '通天境8阶',
  69: '通天境9阶',
  70: '通天境10阶',
  71: '肉身难1阶',
  72: '肉身难2阶',
  73: '肉身难3阶',
  74: '肉身难4阶',
  75: '肉身难5阶',
  76: '肉身难6阶',
  77: '肉身难7阶',
  78: '肉身难8阶',
  79: '肉身难9阶',
  80: '肉身难10阶',
  81: '灵力难1阶',
  82: '灵力难2阶',
  83: '灵力难3阶',
  84: '灵力难4阶',
  85: '灵力难5阶',
  86: '灵力难6阶',
  87: '灵力难7阶',
  88: '灵力难8阶',
  89: '灵力难9阶',
  90: '灵力难10阶',
  91: '神魄难1阶',
  92: '神魄难2阶',
  93: '神魄难3阶',
  94: '神魄难4阶',
  95: '神魄难5阶',
  96: '神魄难6阶',
  97: '神魄难7阶',
  98: '神魄难8阶',
  99: '神魄难9阶',
  100: '神魄难10阶',
  101: '至尊境1阶',
  102: '至尊境2阶',
  103: '至尊境3阶',
  104: '至尊境4阶',
  105: '至尊境5阶',
  106: '至尊境6阶',
  107: '至尊境7阶',
  108: '至尊境8阶',
  109: '至尊境9阶',
  110: '至尊境10阶',
  111: '下位地至尊1阶',
  112: '下位地至尊2阶',
  113: '下位地至尊3阶',
  114: '下位地至尊4阶',
  115: '下位地至尊5阶',
  116: '下位地至尊6阶',
  117: '下位地至尊7阶',
  118: '下位地至尊8阶',
  119: '下位地至尊9阶',
  120: '下位地至尊10阶',
  121: '上位地至尊1阶',
  122: '上位地至尊2阶',
  123: '上位地至尊3阶',
  124: '上位地至尊4阶',
  125: '上位地至尊5阶',
  126: '上位地至尊6阶',
  127: '上位地至尊7阶',
  128: '上位地至尊8阶',
  129: '上位地至尊9阶',
  130: '上位地至尊10阶',
  131: '大圆满地尊1阶',
  132: '大圆满地尊2阶',
  133: '大圆满地尊3阶',
  134: '大圆满地尊4阶',
  135: '大圆满地尊5阶',
  136: '大圆满地尊6阶',
  137: '大圆满地尊7阶',
  138: '大圆满地尊8阶',
  139: '大圆满地尊9阶',
  140: '大圆满地尊10阶',
  141: '准天至尊1阶',
  142: '准天至尊2阶',
  143: '准天至尊3阶',
  144: '准天至尊4阶',
  145: '准天至尊5阶',
  146: '准天至尊6阶',
  147: '准天至尊7阶',
  148: '准天至尊8阶',
  149: '准天至尊9阶',
  150: '准天至尊10阶',
  151: '灵品天至尊1阶',
  152: '灵品天至尊2阶',
  153: '灵品天至尊3阶',
  154: '灵品天至尊4阶',
  155: '灵品天至尊5阶',
  156: '灵品天至尊6阶',
  157: '灵品天至尊7阶',
  158: '灵品天至尊8阶',
  159: '灵品天至尊9阶',
  160: '灵品天至尊10阶',
  161: '仙品天至尊1阶',
  162: '仙品天至尊2阶',
  163: '仙品天至尊3阶',
  164: '仙品天至尊4阶',
  165: '仙品天至尊5阶',
  166: '仙品天至尊6阶',
  167: '仙品天至尊7阶',
  168: '仙品天至尊8阶',
  169: '仙品天至尊9阶',
  170: '仙品天至尊10阶',
  171: '圣品天至尊1阶',
  172: '圣品天至尊2阶',
  173: '圣品天至尊3阶',
  174: '圣品天至尊4阶',
  175: '圣品天至尊5阶',
  176: '圣品天至尊6阶',
  177: '圣品天至尊7阶',
  178: '圣品天至尊8阶',
  179: '圣品天至尊9阶',
  180: '圣品天至尊10阶',
  181: '准主宰境1阶',
  182: '准主宰境2阶',
  183: '准主宰境3阶',
  184: '准主宰境4阶',
  185: '准主宰境5阶',
  186: '准主宰境6阶',
  187: '准主宰境7阶',
  188: '准主宰境8阶',
  189: '准主宰境9阶',
  190: '准主宰境10阶',
  191: '半步主宰境1阶',
  192: '半步主宰境2阶',
  193: '半步主宰境3阶',
  194: '半步主宰境4阶',
  195: '半步主宰境5阶',
  196: '半步主宰境6阶',
  197: '半步主宰境7阶',
  198: '半步主宰境8阶',
  199: '半步主宰境9阶',
  200: '半步主宰境10阶',
  201: '灵品主宰境1阶',
  202: '灵品主宰境2阶',
  203: '灵品主宰境3阶',
  204: '灵品主宰境4阶',
  205: '灵品主宰境5阶',
  206: '灵品主宰境6阶',
  207: '灵品主宰境7阶',
  208: '灵品主宰境8阶',
  209: '灵品主宰境9阶',
  210: '灵品主宰境10阶',
  211: '仙品主宰境1阶',
  212: '仙品主宰境2阶',
  213: '仙品主宰境3阶',
  214: '仙品主宰境4阶',
  215: '仙品主宰境5阶',
  216: '仙品主宰境6阶',
  217: '仙品主宰境7阶',
  218: '仙品主宰境8阶',
  219: '仙品主宰境9阶',
  220: '仙品主宰境10阶',
  221: '圣品主宰境1阶',
  222: '圣品主宰境2阶',
  223: '圣品主宰境3阶',
  224: '圣品主宰境4阶',
  225: '圣品主宰境5阶',
  226: '圣品主宰境6阶',
  227: '圣品主宰境7阶',
  228: '圣品主宰境8阶',
  229: '圣品主宰境9阶',
  230: '圣品主宰境10阶',
  231: '超品主宰境1阶',
  232: '超品主宰境2阶',
  233: '超品主宰境3阶',
  234: '超品主宰境4阶',
  235: '超品主宰境5阶',
  236: '超品主宰境6阶',
  237: '超品主宰境7阶',
  238: '超品主宰境8阶',
  239: '超品主宰境9阶',
  240: '超品主宰境10阶',
  241: '大主宰境1阶',
  242: '大主宰境2阶',
  243: '大主宰境3阶',
  244: '大主宰境4阶',
  245: '大主宰境5阶',
  246: '大主宰境6阶',
  247: '大主宰境7阶',
  248: '大主宰境8阶',
  249: '大主宰境9阶',
  250: '大主宰境10阶',
  251: '大主宰境11阶',
  252: '大主宰境12阶',
  253: '大主宰境13阶',
  254: '大主宰境14阶',
  255: '大主宰境15阶',
  256: '大主宰境16阶',
  257: '大主宰境17阶',
  258: '大主宰境18阶',
  259: '大主宰境19阶',
  260: '大主宰境20阶'
}

export default jingjieMap
