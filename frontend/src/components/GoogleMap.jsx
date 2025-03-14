import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "50%",
  height: "300px",
};

const GooGoogleMapWrapper = ({ lat, lng, zoom }) => {
  // 中心座標を設定
  const center = { lat: parseFloat(lat), lng: parseFloat(lng) };

  return (
    // Google Maps APIキーを使用して地図をロード
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={zoom}>
        {/* 中心の位置にマーカーを表示 */}
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default GooGoogleMapWrapper;
