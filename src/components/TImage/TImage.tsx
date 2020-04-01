/**
  * 图片组件
  *
  * 平台兼容：
  * - [x] h5
  * - [ ] 微信小程序
  *
  * 已经支持的功能：
  * 1. 错误处理
  * 2. 查看大图
  * 3. 加载过渡
  *
  * **注意：**
  *
  * ### 使用方式
  *
  * 为了保证在小程序端展示正常，需要按如下方式使用：
  * 第一种：使用固定宽高的父级元素包裹
  * 第二种：传递宽高属性 仅传数字即可 单位为设计图上的px值
  *
  * ### 必传的属性

  * 第一种方式必传的属性只有 src
  * 第二种方式必传的属性有 src、width、height
  * 其他属性可按需使用，用于支持查看大图，错误处理、加载过渡等功能
  */

import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'

import IMG from '~/utils/img'

import goodsDefaultImg from '~/assets/images/common/img_default_goods.png'
import './TImage.scss'

/**
 * props属性
 */
interface IProps {
  /**
   * 正常展示的图片url 必选
   */
  src: string;
  /**
   * 图片mode 可选
   */
  mode?: "aspectFill" | "scaleToFill" | "aspectFit" | "widthFix" | "top" | "bottom" | "center" | "left" | "right" | "top left" | "top right" | "bottom left" | "bottom right";
  /**
   * 图片异常路径 可选
   */
  errorSrc?: string;
  /**
   * 是否可预览 可选 主要用于不传previewImgList时控制是否可查看大图 当previewImgList存在时不论此属性值为何 都可点击查看previewImgList
   */
  canPreview?: boolean;
  /**
   * 图片预览配置
   */
  previewConfig?: {
    /**
     * 图片数字
     */
    urls: Array<string>;
    /**
     * 预览current
     */
    current?: number;
    /**
     * 当urls为对象形式时的图片url字段名
     */
    field?: string;
  };
  /**
   * 图片宽度 可选 直接取设计图上的px值即可
   */
  width?: number;
  /**
   * 图片高度 可选 直接取设计图上的px值即可
   */
  height?: number;
  /**
   * 加载过程是否展示loading状态
   */
  showLoading?: boolean;
}

/**
 * 组件内部属性
 */
interface IState {
  errorImg: '',
  loadFinished: boolean,
}

class TImage extends Component<IProps, IState> {

  static defaultProps: IProps = {
    src: '',
    canPreview: false,
    previewConfig: {
      urls: [],
      current: 0,
      field: ''
    },
    errorSrc: '',
    mode: 'aspectFill',
  }

  /**
   *
   * @param url 图片错误处理
   */
  handleErr() {
    console.log('into error')
    const { errorSrc } = this.props
    this.setState({
      errorImg: errorSrc || goodsDefaultImg
    })
  }

  /**
   * 图片加载完成
   */
  handleLoad() {
    this.setState({
      loadFinished: true
    })
  }

  /**
   * 图片点击
   */
  handleImgClick() {
    console.log('handleImgClick')
    const { canPreview, previewConfig, src, errorSrc } = this.props
    let queryImgList = []
    if ( !canPreview && !previewConfig ) {
      return
    }
    // 判断urls存在
    if ( previewConfig && previewConfig.urls.length > 0 ) {
      previewConfig.urls.forEach((ele,idx)=>{
        if ( typeof ele === 'string' ) {
          // @ts-ignore
          queryImgList.push(IMG.handleImgUrl(ele))
        } else {
          // @ts-ignore
          queryImgList.push(IMG.handleImgUrl(ele[previewConfig.field]))
        }
      })
    } else {
      console.log('urls不存在, 预览当前图片')
      // @ts-ignore
      queryImgList.push(errorSrc || src)
    }
    console.log('queryImagList', queryImgList)
    if ( queryImgList.length > 0 ) {
      const data = {
        list: queryImgList,
        current: previewConfig && previewConfig.current ? previewConfig.current : 0
      }
      IMG.preview(data)
    }
  }

  render () {
    const { src, mode, width, height, showLoading } = this.props
    const { errorImg, loadFinished } = this.state
    return (
      <View className="TImage-comp"
        style={width&&height?{
          width: Taro.pxTransform(width),
          height: Taro.pxTransform(height)
        }:{}}
      >
        {
          showLoading && !loadFinished &&
          <view className="svg-box">
            <svg t="1579254990044" class="icon svg" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2662" width="200" height="200"><path d="M393.664871 495.52477c0 11.307533-9.168824 20.466124-20.466124 20.466124l-103.671151 0c-11.307533 0-20.466124-9.15859-20.466124-20.466124 0-11.2973 9.15859-20.466124 20.466124-20.466124l103.671151 0C384.496048 475.058646 393.664871 484.22747 393.664871 495.52477z" p-id="2663" fill="#999999"></path><path d="M805.207925 495.52477c0 11.307533-9.15859 20.466124-20.466124 20.466124l-103.671151 0c-11.2973 0-20.466124-9.15859-20.466124-20.466124 0-11.2973 9.168824-20.466124 20.466124-20.466124l103.671151 0C796.049335 475.058646 805.207925 484.22747 805.207925 495.52477z" p-id="2664" fill="#999999"></path><path d="M547.600823 237.917668l0 103.671151c0 11.307533-9.15859 20.466124-20.466124 20.466124s-20.466124-9.15859-20.466124-20.466124l0-103.671151c0-11.307533 9.15859-20.466124 20.466124-20.466124C538.442232 217.451544 547.600823 226.610134 547.600823 237.917668z" p-id="2665" fill="#999999"></path><path d="M547.600823 649.460722l0 103.681384c0 11.2973-9.15859 20.466124-20.466124 20.466124s-20.466124-9.168824-20.466124-20.466124l0-103.681384c0-11.2973 9.15859-20.466124 20.466124-20.466124C538.442232 628.994598 547.600823 638.163421 547.600823 649.460722z" p-id="2666" fill="#999999"></path><path d="M411.562497 428.754041c-3.786233 6.569626-10.673084 10.233062-17.733896 10.233062-3.479241 0-6.999414-0.880043-10.222829-2.742461l-89.774653-51.861158c-9.782807-5.658883-13.129019-18.173918-7.480368-27.956725 5.658883-9.79304 18.173918-13.139252 27.956725-7.490601l89.774653 51.861158C413.864936 406.456199 417.22138 418.971234 411.562497 428.754041z" p-id="2667" fill="#999999"></path><path d="M767.918647 634.633015c-3.796466 6.559393-10.673084 10.233062-17.744129 10.233062-3.469008 0-6.989181-0.890276-10.212596-2.752694l-89.774653-51.861158c-9.782807-5.64865-13.139252-18.173918-7.480368-27.956725 5.64865-9.79304 18.173918-13.139252 27.956725-7.480368l89.774653 51.861158C770.221086 612.32494 773.567297 624.850208 767.918647 634.633015z" p-id="2668" fill="#999999"></path><path d="M673.723312 282.70778l-51.861158 89.76442c-3.786233 6.559393-10.673084 10.233062-17.744129 10.233062-3.469008 0-6.989181-0.890276-10.212596-2.752694-9.79304-5.64865-13.139252-18.163685-7.480368-27.956725l51.861158-89.76442c5.64865-9.79304 18.163685-13.139252 27.956725-7.490601C676.025751 260.399705 679.382195 272.91474 673.723312 282.70778z" p-id="2669" fill="#999999"></path><path d="M467.854571 639.053698l-51.861158 89.774653c-3.796466 6.559393-10.673084 10.233062-17.744129 10.233062-3.479241 0-6.999414-0.890276-10.222829-2.752694-9.782807-5.658883-13.139252-18.173918-7.480368-27.956725l51.861158-89.774653c5.658883-9.782807 18.173918-13.129019 27.956725-7.480368C470.15701 616.755856 473.503221 629.27089 467.854571 639.053698z" p-id="2670" fill="#999999"></path><path d="M460.435601 379.911636c-3.213181 1.862417-6.733355 2.742461-10.202363 2.742461-7.081279 0-13.957897-3.673669-17.744129-10.243295l-51.809993-89.795119c-5.64865-9.79304-2.292206-22.308075 7.500834-27.956725 9.79304-5.64865 22.308075-2.292206 27.956725 7.500834l51.79976 89.795119C473.585085 361.747951 470.228641 374.262986 460.435601 379.911636z" p-id="2671" fill="#999999"></path><path d="M666.089447 736.400816c-3.223415 1.852184-6.743588 2.742461-10.212596 2.742461-7.071046 0-13.957897-3.673669-17.744129-10.243295l-51.79976-89.805352c-5.64865-9.79304-2.292206-22.308075 7.500834-27.956725 9.782807-5.64865 22.297842-2.281973 27.946492 7.500834l51.809993 89.805352C679.238932 718.237131 675.882488 730.752166 666.089447 736.400816z" p-id="2672" fill="#999999"></path><path d="M760.499677 384.526747l-89.795119 51.809993c-3.223415 1.852184-6.743588 2.742461-10.212596 2.742461-7.071046 0-13.957897-3.673669-17.744129-10.243295-5.64865-9.79304-2.292206-22.308075 7.500834-27.956725l89.805352-51.809993c9.782807-5.638417 22.297842-2.281973 27.946492 7.500834C773.649162 366.363062 770.292718 378.878097 760.499677 384.526747z" p-id="2673" fill="#999999"></path><path d="M404.02073 590.180594l-89.805352 51.79976c-3.213181 1.862417-6.733355 2.742461-10.202363 2.742461-7.081279 0-13.957897-3.673669-17.744129-10.243295-5.64865-9.79304-2.292206-22.308075 7.500834-27.956725l89.795119-51.79976c9.79304-5.64865 22.308075-2.292206 27.956725 7.500834S413.81377 584.531943 404.02073 590.180594z" p-id="2674" fill="#999999"></path></svg>
          </view>
        }
        <Image src={errorImg || src}
          mode={mode}
          onClick={this.handleImgClick.bind(this)}
          onError={this.handleErr.bind(this)}
          onLoad={this.handleLoad.bind(this)}
        />
      </View>
    )
  }
}

export default TImage
