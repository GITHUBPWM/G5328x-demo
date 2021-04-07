<template>
  <div>
    <div class="content-header">{{ $route.meta.label }}</div>
    <div class="dev-list-box" :class="{ open: isOPen }">
      <div ref="devContent">
        <div class="dev-box" v-for="(item, index) in devLists" :key="index">
          <i class="iconfont">{{ con_config.devIconCfg[index].code }}</i>
          <div class="info-box">
            <div v-if="typeof item === 'object'">
              <div class="dev-num-stu">
                在线：<span>{{ item.online }}</span>
              </div>
              <div class="dev-num-stu">
                离线：<span>{{ item.offline }}</span>
              </div>
            </div>
            <div v-else class="dev-num">{{ item }}</div>
            <div class="dev-name">{{ con_config.devIconCfg[index].name }}</div>
          </div>
        </div>
        <div style="clear: left"></div>
      </div>
      <div v-show="showBtn" class="close iconfont" :class="{ rotate: isOPen }" @click="isOPen = !isOPen"></div>
    </div>
    <div class="dev-status">
      <div class="status-header">
        <span class="on-stu">在线</span>
        <span class="off-stu">离线</span>
        <input type="checkbox" /><span>显示端口</span> <input type="checkbox" /><span>显示IP</span>
        <input type="checkbox" /><span>显示设备名</span>
        <div class="right-bt">
          <input type="checkbox" />
          <span>自动刷新</span>
          <div class="refresh-stu">刷新</div>
          <div class="save-stu">保存</div>
          <div class="delete-off">清除离线</div>
        </div>
      </div>
      <div class="status-canvas">
        <div ref="topoCanvas" id="mountNode"></div>
      </div>
    </div>
    <topo-dialog :info="dialogInfo"></topo-dialog>
  </div>
</template>

<script>
import elementResizeDetectorMaker from "element-resize-detector";
import topoDialog from "./graphCfg/TopoDialog";
import G6 from "@antv/g6";
import keyShape from "./graphCfg/treeNode";

export default {
  name: "GlobalMap",
  data() {
    return {
      devLists: null,
      showBtn: false,
      isOPen: false,
      TopoDeviceListInfo: [],
      graph: {},
      tree: {},
      canvasWidth: 0,
      canvasHeight: 0,
      statusColor: {
        "0": "#979797", // 离线
        "1": "#1cd1a1" // 在线
      },
      dialogInfo: {
        id: "",
        show: false,
        icon:""
      }
    };
  },
  components: {
    topoDialog
  },
  computed: {},
  watch: {},
  methods: {
    /** 监听元素大小变化，动态显示展开按钮 */
    watchDevSize() {
      let that = this;
      let erd = elementResizeDetectorMaker();
      erd.listenTo(that.$refs.devContent, (element) => {
        this.showBtn = element.offsetHeight > 100;
        this.isOPen = this.isOPen && !(element.offsetHeight <= 100);
      });
    },

    /** 将List数据转换为树形对象结构，用于G6树图渲染 */
    listToTree(list) {
      const dataMap = {};
      if (list.length > 0) {
        //将列表数组转换为对象，方便后面直接用名称访问节点
        list.forEach((item) => {
          console.log(item)
          let { pmac, mac, ip, type, status ,name} = item,
            nodeData = {
              id: mac,
              pmac,
              ip,
              name,
              icon: this.con_config.devIconCfg[type],
              color: this.statusColor[status],
              children: []
            };
          dataMap[item.mac] = nodeData;
        });

        list.forEach((item, index) => {
          //如果存在父节点，则添加进dataMap中相应父节点对象的children中，（这里不用考虑遍历的先后顺序，比如担心父节点如果先加进了他的父节点中，怕子节点找不到父节点了。
          //并不会，又没有将父节点删掉，只是在别的地方也加进他了，你还是能通过对象.名称访问到他，
          //而且后续你将子节点加进这个节点的时候，他父节点那块同样也会同步子节点信息，因为他是对象，传的是地址，所以改动都能同步）
          if (dataMap[item.pmac]) {
            dataMap[item.pmac].children.push(dataMap[item.mac]);
          } else {
            //如果没有父节点了，则说明是根节点
            this.tree = dataMap[item.mac];
          }
        });
      }
    },

    initGraph() {
      this.graph = new G6.TreeGraph({
        container: "mountNode",
        width: this.canvasWidth,
        height: this.canvasHeight,
        modes: {
          default: [
            {
              type: "collapse-expand",
              shouldBegin: (e) => {
                if (e.target.get("name") !== "collapseShape") return false;
                return true;
              },
              onChange: (item, collapsed) => {
                let collapseShape = item.getContainer().find((shape) => shape.get("name") === "collapseShape");
                collapseShape.attr("text", collapsed ? "\ue682" : "\ue67e");
              }
            },
            "drag-canvas",
            "zoom-canvas"
          ]
        },
        defaultNode: {
          type: "tree-node",
          anchorPoints: [
            [0, 0.5],
            [1.8, 0.5]
          ]
        },
        layout: {
          type: "mindmap",
          direction: "H",
          getHeight: function getHeight() {
            return 20;
          },
          getWidth: function getWidth() {
            return 50;
          },
          getVGap: function getVGap() {
            return 40;
          },
          getHGap: function getHGap() {
            return 60;
          }
        }
      });
    },

    initGraphEvent() {
      //根据数据显示边的颜色
      this.graph.edge((edge) => {
        return {
          type: "cubic-horizontal",
          style: {
            stroke: edge.target._cfg.model.color
          }
        };
      });

      this.graph.on("node:click", this.clickNode);
      this.graph.on("canvas:click", () => {
        if (this.dialogInfo.show) {
          this.closeTopoDialog();
        }
      });
      this.graph.on("dragstart", () => {
        this.closeTopoDialog();
      });
    },

    /** 绘制G6树图 */
    renderGraph() {
      this.graph.data(this.tree);
      this.graph.render();
      this.graph.fitCenter();
    },

    clickNode(evt) {
      if (evt.target.get("name") === "devIconShape" && !this.dialogInfo.show) {
        this.showTopoDialog(evt.item);
      } else {
        this.closeTopoDialog();
      }
    },

    showTopoDialog(item) {
      this.graph.removeBehaviors("zoom-canvas", "default");
      let clientXY = this.graph.getClientByPoint(item.getBBox().x, item.getBBox().y);
      this.dialogInfo.top = clientXY.y + "px";
      this.dialogInfo.left = clientXY.x + 50 + "px";
      this.dialogInfo.ip = item.get("model").ip;
      this.dialogInfo.type = item.get("model").ip;
      this.dialogInfo.icon = item.get("model").icon;
      this.dialogInfo.id = item.get("id");
      this.dialogInfo.name = item.get("model").name;
      this.dialogInfo.show = true;
    },

    closeTopoDialog() {
      this.dialogInfo.show = false;
      this.graph.addBehaviors("zoom-canvas", "default");
    }
  },
  mounted() {
    this.watchDevSize();
    /** 这个nextTick不能写进initGraph里面，否则获取不到$refs.topoCanvas.scrollHeight，原因：
        1、写进initGraph，执行顺序是这样的: this.$nextTick声明 -> new G6.TreeGraph过程 -> this.$nextTick里的内容。 即：在同一空间执行任务时，
          会按顺序执行，遇到异步任务后，会将其添加进另一异步任务队列，待所有同步任务执行完成后，再按顺序执行异步任务。这样在new G6时，时此并没有执行nextTick里面的内容，因此拿不到值。
        2、写在这里时，执行顺序：this.$nextTick声明  ->  get("getTopoDeviceListInfo", (res)）请求 -> this.$nextTick内容 -> get请求成功里的this.initGraph();
          initGraph这里也被放进了异步队列，而且是在nextTick后面，所以在执行 initGraph之前 就已经能拿到$refs.topoCanvas.scrollHeight值了。
    */
    this.$nextTick(() => {
      this.canvasHeight = this.$refs.topoCanvas.scrollHeight;
      this.canvasWidth = this.$refs.topoCanvas.scrollWidth;
    });

    this.get("getTopoDeviceStatistics", (res) => {
      this.devLists = res.data;
    });
    this.get("getTopoDeviceListInfo", (res) => {
      this.TopoDeviceListInfo = res.data.list;
      this.listToTree(this.TopoDeviceListInfo);
      this.initGraph();
      this.initGraphEvent();
      this.renderGraph();
    });
  }
};
</script>

<style lang="less" scoped>
@import "../../css/common.less";
@import "../../css/icon.css";
@import "../../css/visualization/globalMap.less";
</style>
