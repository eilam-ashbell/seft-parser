"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const recordTypes = {
    "001": {
        fieldNames: [
            "Auto_Enhance_Unprocessed",
            "DualShot_1",
            "DualShot_2",
            "DualShot_3",
            "DualShot_4",
            "DualShot_5",
            "DualShot_6",
            "DualShot_7",
            "DualShot_8",
            "DualShot_9",
            "SingleShot",
        ],
        contentType: "JPEG",
        // convertFunc: (data) => data,
    },
    "100": {
        fieldNames: ["SoundShot_000"],
        contentType: "audio",
        // convertFunc: (data) => data,
    },
    "800": {
        fieldNames: ["SoundShot_Meta_Info"],
        contentType: "audio",
        // convertFunc: (data) => data,
    },
    "8c0": {
        fieldNames: ["Auto_Enhance_Info"],
        contentType: "binary",
        // convertFunc: (data) => data,
    },
    "8e0": {
        fieldNames: ["Front_Cam_Selfie_Info"],
        contentType: "label + binary",
        // convertFunc: (data) => data,
    },
    "9e0": {
        fieldNames: ["Burst_Shot_Info"],
        contentType: "unknown",
        // convertFunc: (data) => data,
    },
    "9e1": {
        fieldNames: ["BurstShot_Best_Photo_Info"],
        contentType: "unknown",
        // convertFunc: (data) => data,
    },
    "9f0": {
        fieldNames: ["Pro_Mode_Info"],
        contentType: "unknown",
        // convertFunc: (data) => data,
    },
    a01: {
        fieldNames: ["Image_UTC_Data"],
        contentType: "timestamp",
        // convertFunc: recordContentParsers.timestamp,
    },
    a30: {
        fieldNames: ["MotionPhoto_Data"],
        contentType: "video",
        // convertFunc: (data) => data,
    },
    a41: {
        fieldNames: ["BackupRestore_Data"],
        contentType: "unknown",
        // convertFunc: (data) => data,
    },
    aa1: {
        fieldNames: ["MCC_Data"],
        contentType: "mcc",
        // convertFunc: recordContentParsers.mcc,
    },
    ab0: {
        fieldNames: ["DualShot_Meta_Info"],
        contentType: "DOFS v2",
        // convertFunc: (data) => data,
    },
    ab1: {
        fieldNames: ["DualShot_DepthMap_1"],
        contentType: "unknown",
        // convertFunc: (data) => data,
    },
    ab3: {
        fieldNames: ["DualShot_Extra_Info"],
        contentType: "binary",
        // convertFunc: (data) => data,
    },
    ab4: {
        fieldNames: ["DualShot_Core_Info"],
        contentType: "binary",
        // convertFunc: (data) => data,
    },
    b30: {
        fieldNames: ["Camera_Sticker_Info"],
        contentType: "unknown",
        // convertFunc: (data) => data,
    },
    b40: {
        fieldNames: ["SingleShot_Meta_Info"],
        contentType: "DOFS v3",
        // convertFunc: (data) => data,
    },
    b41: {
        fieldNames: [
            "SingeShot_DepthMap_10",
            "SingeShot_DepthMap_1",
            "SingeShot_DepthMap_2",
            "SingeShot_DepthMap_3",
            "SingeShot_DepthMap_4",
            "SingeShot_DepthMap_5",
            "SingeShot_DepthMap_6",
            "SingeShot_DepthMap_7",
            "SingeShot_DepthMap_8",
            "SingeShot_DepthMap_9",
            "SingleShot_DepthMap_10",
            "SingleShot_DepthMap_1",
            "SingleShot_DepthMap_2",
            "SingleShot_DepthMap_3",
            "SingleShot_DepthMap_4",
            "SingleShot_DepthMap_5",
            "SingleShot_DepthMap_6",
            "SingleShot_DepthMap_7",
            "SingleShot_DepthMap_8",
            "SingleShot_DepthMap_9",
        ],
        contentType: "PNG",
        // convertFunc: (data) => data,
    },
    b51: {
        fieldNames: ["Intelligent_PhotoEditor_Data"],
        contentType: "unknown",
        // convertFunc: (data) => data,
    },
    b60: {
        fieldNames: ["UltraWide_PhotoEditor_Data"],
        contentType: "unknown",
        // convertFunc: (data) => data,
    },
    b8a: {
        fieldNames: [
            "Single_Take_Camera_Info",
            "Single_Take_Content_Type_Info",
        ],
        contentType: "unknown",
        // convertFunc: (data) => data,
    },
    b90: {
        fieldNames: ["Document_Scan_Info"],
        contentType: "unknown",
        // convertFunc: (data) => data,
    },
    ba1: {
        fieldNames: [
            "deco_doodle_bitmap",
            "deco_sticker_bitmap",
            "deco_text_bitmap",
            "Original_Path_Hash_Key",
            "PhotoEditor_Re_Edit_Data",
        ],
        contentType: "ascii",
        // convertFunc: recordContentParsers.ascii,
    },
    ba2: {
        fieldNames: ["Copy_Available_Edit_Info"],
        contentType: "JSON",
        // convertFunc: (data) => data,
    },
    bc0: {
        fieldNames: ["Single_Relighting_Bokeh_Info"],
        contentType: "DOFS v3",
        // convertFunc: (data) => data,
    },
    bd0: {
        fieldNames: ["Dual_Relighting_Bokeh_Info"],
        contentType: "DOFS v2",
        // convertFunc: (data) => data,
    },
    be0: {
        fieldNames: ["Livefocus_JDM_Info"],
        contentType: "unknown",
        // convertFunc: (data) => data,
    },
    bf0: {
        fieldNames: ["Remaster_Info"],
        contentType: "unknown",
        // convertFunc: (data) => data,
    },
    c21: {
        fieldNames: ["Portrait_Effect_Info"],
        contentType: "unknown",
        // convertFunc: (data) => data,
    },
    c51: {
        fieldNames: ["Samsung_Capture_Info"],
        contentType: "unknown",
        // convertFunc: (data) => data,
    },
    c61: {
        fieldNames: ["Camera_Capture_Mode_Info"],
        contentType: "ascii",
        // convertFunc: recordContentParsers.ascii,
    },
    c71: {
        fieldNames: ["Pro_White_Balance_Info"],
        contentType: "unknown",
        // convertFunc: (data) => data,
    },
    c81: {
        fieldNames: ["Watermark_Info"],
        contentType: "label + binary",
        // convertFunc: (data) => data,
    },
    cc1: {
        fieldNames: ["Color_Display_P3"],
        contentType: "unknown",
        // convertFunc: (data) => data,
    },
    cd2: {
        fieldNames: ["Photo_HDR_Info"],
        contentType: "unknown",
        // convertFunc: (data) => data,
    },
    ce1: {
        fieldNames: ["Gallery_DC_Data"],
        contentType: "unknown",
        // convertFunc: (data) => data,
    },
    d01: {
        fieldNames: ["Camera_Scene_Info"],
        contentType: "unknown",
        // convertFunc: (data) => data,
    },
    d11: {
        fieldNames: ["Video_Snapshot_Info"],
        contentType: "label + binary",
        // convertFunc: (data) => data,
    },
    d31: {
        fieldNames: ["Food_Blur_Effect_Info"],
        contentType: "label",
        // convertFunc: (data) => data,
    },
    d91: {
        fieldNames: ["PEg_Info"],
        contentType: "JSON",
        // convertFunc: (data) => data,
    },
    da1: {
        fieldNames: ["Captured_App_Info"],
        contentType: "base64-encoded json",
        // convertFunc: (data) => data,
    },
};
exports.default = recordTypes;
