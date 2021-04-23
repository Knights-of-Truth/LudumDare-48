<?xml version="1.0" encoding="UTF-8"?>
<tileset version="1.5" tiledversion="1.6.0" name="Prototype" tilewidth="8" tileheight="8" tilecount="1024" columns="32" objectalignment="center">
 <editorsettings>
  <export target="prototype.json" format="json"/>
 </editorsettings>
 <transformations hflip="1" vflip="1" rotate="1" preferuntransformed="1"/>
 <image source="prototype.png" width="256" height="256"/>
 <tile id="34" type="crate"/>
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
 </wangsets>
</tileset>
