import Svg, { ClipPath, Mask, Path, Rect } from "react-native-svg";

export const HomeIcon = ({ color }) => (
  <Svg
    width="23"
    height="24"
    viewBox="0 0 23 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Mask
      id="path-1-outside-1_28_175"
      maskUnits="userSpaceOnUse"
      x="-0.0772182"
      y="0.0261469"
      width="22.1598"
      height="23.1528"
      fill="black"
    >
      <Rect
        fill={color}
        x="-0.0772182"
        y="0.0261469"
        width="22.1598"
        height="23.1528"
      />
      <ClipPath d="M14.0688 21.0809L14.0131 13.0811C14.0112 12.8159 13.9041 12.5623 13.7153 12.376C13.5264 12.1898 13.2713 12.0862 13.0061 12.0881L9.00622 12.116C8.74101 12.1178 8.48739 12.2249 8.30117 12.4138C8.11494 12.6026 8.01136 12.8577 8.01321 13.1229L8.06898 21.1227" />
      <ClipPath d="M1.99244 10.1648C1.99035 9.87389 2.05174 9.58601 2.17236 9.32125C2.29297 9.0565 2.46989 8.82125 2.69077 8.63191L9.64878 2.58425C10.0076 2.27665 10.4638 2.10608 10.9365 2.10278C11.4091 2.09949 11.8676 2.26369 12.2307 2.56625L19.2724 8.51631C19.4959 8.70255 19.6761 8.93531 19.8004 9.19836C19.9246 9.4614 19.99 9.7484 19.992 10.0393L20.0547 19.0391C20.0584 19.5695 19.8513 20.0797 19.4788 20.4574C19.1064 20.835 18.5992 21.0493 18.0687 21.053L4.06908 21.1506C3.53866 21.1543 3.0285 20.9471 2.65082 20.5747C2.27314 20.2022 2.05889 19.695 2.05519 19.1646L1.99244 10.1648Z" />
    </Mask>
    <Path
      d="M12.0689 21.0948C12.0766 22.1994 12.9782 23.0885 14.0828 23.0808C15.1873 23.0731 16.0765 22.1715 16.0688 21.0669L12.0689 21.0948ZM6.06903 21.1367C6.07673 22.2412 6.97838 23.1304 8.08293 23.1227C9.18747 23.115 10.0766 22.2133 10.0689 21.1088L6.06903 21.1367ZM1.99244 10.1648L3.9924 10.1509L3.99239 10.1504L1.99244 10.1648ZM2.69077 8.63191L3.99242 10.1504L4.00279 10.1414L2.69077 8.63191ZM9.64878 2.58425L8.34713 1.06573L8.33677 1.07474L9.64878 2.58425ZM10.9365 2.10278L10.9225 0.102833L10.9365 2.10278ZM12.2307 2.56625L13.5216 1.03856L13.511 1.02977L12.2307 2.56625ZM19.2724 8.51631L17.9815 10.044L17.9921 10.0528L19.2724 8.51631ZM19.992 10.0393L17.9921 10.0528L17.9921 10.0533L19.992 10.0393ZM2.05519 19.1646L0.0552358 19.1785L2.05519 19.1646ZM16.0688 21.0669L16.013 13.0671L12.0131 13.095L12.0689 21.0948L16.0688 21.0669ZM16.013 13.0671C16.0075 12.2715 15.6861 11.5107 15.1196 10.952L12.3109 13.8001C12.1221 13.6138 12.015 13.3602 12.0131 13.095L16.013 13.0671ZM15.1196 10.952C14.5531 10.3933 13.7878 10.0826 12.9922 10.0881L13.0201 14.088C12.7549 14.0899 12.4998 13.9863 12.3109 13.8001L15.1196 10.952ZM12.9922 10.0881L8.99227 10.116L9.02016 14.1159L13.0201 14.088L12.9922 10.0881ZM8.99227 10.116C8.19664 10.1216 7.4358 10.4429 6.87713 11.0095L9.72521 13.8181C9.53898 14.0069 9.28537 14.1141 9.02016 14.1159L8.99227 10.116ZM6.87713 11.0095C6.31846 11.576 6.00771 12.3412 6.01326 13.1369L10.0132 13.109C10.015 13.3742 9.91143 13.6293 9.72521 13.8181L6.87713 11.0095ZM6.01326 13.1369L6.06903 21.1367L10.0689 21.1088L10.0132 13.109L6.01326 13.1369ZM3.99239 10.1504L0.352319 8.49212C0.111096 9.02163 -0.0116999 9.59738 -0.00750387 10.1792L3.99239 10.1504ZM3.99239 10.1504L1.38916 7.11342C0.947382 7.49211 0.593541 7.96261 0.352319 8.49212L3.99239 10.1504ZM4.00279 10.1414L10.9608 4.09376L8.33677 1.07474L1.37876 7.1224L4.00279 10.1414ZM10.9504 4.10274L10.9504 4.10274L10.9225 0.102833C9.97725 0.109423 9.06487 0.450568 8.34716 1.06577L10.9504 4.10274ZM10.9504 4.10274L10.9504 4.10274L13.511 1.02977C12.7848 0.424634 11.8678 0.0962429 10.9225 0.102833L10.9504 4.10274ZM10.9399 4.09391L17.9815 10.044L20.5632 6.98865L13.5216 1.0386L10.9399 4.09391ZM17.9921 10.0528L21.6087 8.34393C21.3601 7.81783 20.9997 7.35231 20.5527 6.97982L17.9921 10.0528ZM17.9921 10.0528L21.992 10.0259C21.988 9.44401 21.8572 8.87002 21.6087 8.34393L17.9921 10.0528ZM17.9921 10.0533L18.0548 19.053L22.0547 19.0252L21.992 10.0254L17.9921 10.0533ZM18.0548 19.053L20.9029 21.8617C21.6478 21.1063 22.0621 20.086 22.0547 19.0252L18.0548 19.053ZM18.0548 19.053L18.0827 23.053C19.1435 23.0456 20.158 22.617 20.9029 21.8617L18.0548 19.053ZM18.0548 19.053L4.05514 19.1507L4.08302 23.1506L18.0827 23.053L18.0548 19.053ZM4.05514 19.1507L1.2465 21.9987C2.00185 22.7436 3.02218 23.1579 4.08302 23.1506L4.05514 19.1507ZM4.05514 19.1507L0.0552358 19.1785C0.0626315 20.2394 0.491142 21.2538 1.2465 21.9987L4.05514 19.1507ZM4.05514 19.1507L3.9924 10.1509L-0.00750733 10.1788L0.0552358 19.1785L4.05514 19.1507Z"
      fill={color}
      mask="url(#path-1-outside-1_28_175)"
    />
  </Svg>
);