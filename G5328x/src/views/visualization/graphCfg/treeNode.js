import { registerNode } from "@antv/g6";
import G6 from "@antv/g6";

registerNode(
  "tree-node",
  {
    options: {
      style: {},
      stateStyles: {
        hover: {},
        selected: {},
      },
    },
    

    draw(cfg, group) {
      /**设备图标 */
      let keyShape = group.addShape("text", {
        attrs: {
          x: 0,
          y: 0,
          width:80,
          height:80,
          fill:cfg.color,
          fontFamily: "iconfont",
          text: cfg.icon.code,
          fontSize: 40,
        },
        draggable: true,
        name: "devIconShape"
      });

      /**展开、收起图标 */
      if(cfg.children.length){
        group.addShape("text", {
          attrs: {
            x: 50,
            y: -10,
            fill:"#666",
            fontFamily:  "iconfont",
            text: "\ue67e" ,
            fontSize: 20,
          },
          name: 'collapseShape',
        });
      }
      
      /** ip文本 */
      group.addShape("text", {
        attrs: {
          x: 20,
          y: 25,
          fill: "#666",
          fontSize: 16,
          textAlign: "center",
          text: cfg.ip
        }
      });
      return keyShape;
    }
  },
  "single-node"
);
