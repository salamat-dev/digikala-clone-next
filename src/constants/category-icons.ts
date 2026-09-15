/* نگاشت نام آیکون دسته‌بندی به کامپوننت آیکون */
import {
  IconDeviceMobile,
  IconDeviceLaptop,
  IconDeviceTv,
  IconHome,
  IconWashMachine,
  IconPerfume,
  IconShirt,
  IconDiamond,
  IconCar,
  IconHeartPause,
  IconTool,
  IconBooks,
  IconBallFootball,
  IconGift,
  IconShoppingCart,
  IconHorseToy,
  IconBuildingStore,
  IconDog,
  IconCategory,
} from "@tabler/icons-react";

export const categoryIcons = {
  "cube-cat-mobile": IconDeviceMobile,

  "cube-cat-electronic": IconDeviceLaptop,

  "cube-media-devices": IconDeviceTv,

  "cube-cat-homekitchen": IconHome,

  "cube-khanegi-barghi-main": IconWashMachine,

  "cube-cat-beauty": IconPerfume,

  "cube-cat-fashion": IconShirt,

  "cube-cat-jewelry": IconDiamond,

  "cube-cat-vehicle": IconCar,

  "cube-cat-health": IconHeartPause,

  "cube-cat-tools": IconTool,

  "cube-cat-bookstationary": IconBooks,

  "cube-cat-sportoutdoor": IconBallFootball,

  "cube-action-gift-card": IconGift,

  "cube-cat-fresh": IconShoppingCart,

  "cube-cat-kidstoy": IconHorseToy,

  "cube-cat-roosta": IconBuildingStore,

  "cube-cat-fmcg-pet": IconDog,
} as const;

export const defaultCategoryIcon = IconCategory;