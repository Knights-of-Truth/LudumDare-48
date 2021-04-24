<?xml version="1.0" encoding="UTF-8"?>
<tileset version="1.5" tiledversion="1.6.0" name="Prototype" tilewidth="8" tileheight="8" tilecount="1024" columns="32" objectalignment="center">
 <editorsettings>
  <export target="prototype.json" format="json"/>
 </editorsettings>
 <transformations hflip="1" vflip="1" rotate="1" preferuntransformed="1"/>
 <image source="prototype.png" width="256" height="256"/>
 <tile id="34" type="crate"/>
 <tile id="64" type="Player"/>
 <wangsets>
  <wangset name="Terrains" type="corner" tile="-1">
   <wangcolor name="Matter" color="#ff0000" tile="100" probability="1"/>
   <wangtile tileid="1" wangid="0,0,0,1,0,0,0,0"/>
   <wangtile tileid="2" wangid="0,0,0,1,0,1,0,0"/>
   <wangtile tileid="3" wangid="0,0,0,0,0,1,0,0"/>
   <wangtile tileid="4" wangid="0,1,0,0,0,1,0,1"/>
   <wangtile tileid="5" wangid="0,1,0,1,0,0,0,1"/>
   <wangtile tileid="33" wangid="0,1,0,1,0,0,0,0"/>
   <wangtile tileid="34" wangid="0,1,0,1,0,1,0,1"/>
   <wangtile tileid="35" wangid="0,0,0,0,0,1,0,1"/>
   <wangtile tileid="36" wangid="0,0,0,1,0,1,0,1"/>
   <wangtile tileid="37" wangid="0,1,0,1,0,1,0,0"/>
   <wangtile tileid="65" wangid="0,1,0,0,0,0,0,0"/>
   <wangtile tileid="66" wangid="0,1,0,0,0,0,0,1"/>
   <wangtile tileid="67" wangid="0,0,0,0,0,0,0,1"/>
  </wangset>
  <wangset name="Pipe" type="edge" tile="-1">
   <wangcolor name="" color="#ff0000" tile="-1" probability="1"/>
   <wangtile tileid="6" wangid="1,0,0,0,1,0,0,0"/>
   <wangtile tileid="7" wangid="0,0,1,0,1,0,0,0"/>
   <wangtile tileid="38" wangid="0,0,1,0,0,0,0,0"/>
   <wangtile tileid="39" wangid="1,0,1,0,1,0,1,0"/>
   <wangtile tileid="40" wangid="0,0,1,0,1,0,1,0"/>
  </wangset>
  <wangset name="Wall" type="mixed" tile="-1">
   <wangcolor name="Solid" color="#ff0000" tile="-1" probability="1"/>
   <wangcolor name="White" color="#00ff00" tile="-1" probability="1"/>
   <wangcolor name="Pipe" color="#0000ff" tile="-1" probability="1"/>
   <wangtile tileid="6" wangid="3,0,0,0,3,0,0,0"/>
   <wangtile tileid="7" wangid="0,0,3,0,3,0,0,0"/>
   <wangtile tileid="38" wangid="0,0,3,0,0,0,0,0"/>
   <wangtile tileid="39" wangid="3,0,3,0,3,0,3,0"/>
   <wangtile tileid="40" wangid="0,0,3,0,3,0,3,0"/>
   <wangtile tileid="98" wangid="0,1,0,1,0,0,0,1"/>
   <wangtile tileid="99" wangid="0,1,0,1,0,1,0,1"/>
   <wangtile tileid="100" wangid="0,0,2,0,0,0,0,0"/>
   <wangtile tileid="101" wangid="0,0,0,0,2,0,2,0"/>
   <wangtile tileid="102" wangid="2,0,0,0,2,0,0,0"/>
   <wangtile tileid="103" wangid="3,0,0,0,2,0,0,0"/>
   <wangtile tileid="104" wangid="0,0,3,0,3,0,2,0"/>
   <wangtile tileid="105" wangid="2,0,3,0,3,0,3,0"/>
   <wangtile tileid="106" wangid="3,0,2,0,3,0,2,0"/>
   <wangtile tileid="107" wangid="3,0,0,0,3,0,2,0"/>
   <wangtile tileid="130" wangid="0,1,0,0,0,0,0,0"/>
   <wangtile tileid="131" wangid="0,1,0,0,0,0,0,1"/>
   <wangtile tileid="133" wangid="2,0,2,0,2,0,2,0"/>
   <wangtile tileid="134" wangid="2,0,0,0,2,0,2,0"/>
   <wangtile tileid="136" wangid="0,0,2,0,2,0,3,0"/>
   <wangtile tileid="137" wangid="3,0,2,0,2,0,2,0"/>
   <wangtile tileid="138" wangid="2,0,3,0,2,0,3,0"/>
   <wangtile tileid="139" wangid="2,0,0,0,2,0,3,0"/>
  </wangset>
 </wangsets>
</tileset>
