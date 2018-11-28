import PropTypes from 'prop-types'
import classNames from 'classnames'
import { indexBy, prop } from 'ramda'
import React, { Component } from 'react'
import ContentLoader from 'react-content-loader'

import SocialButton from './components/SocialButton'
import { SOCIAL_ENUM } from './constants/social'

class Share extends Component {
  static propTypes = {
    /** Social Networks configuration */
    social: PropTypes.object,
    /** Share buttons options */
    options: PropTypes.shape({
      /** Share buttons size in pixels */
      size: PropTypes.number,
    }),
    /** Share URL title */
    title: PropTypes.string,
    /** Indcates if the component should render the Content Loader */
    loading: PropTypes.bool,
    /** Component and content loader styles */
    styles: PropTypes.object,
    /** Classes to be applied to root element  */
    className: PropTypes.string,
    /** Classes to be applied to social button */
    socialButtonClass: PropTypes.string,
    /** Classes to be applied to icon of the button */
    socialIconClass: PropTypes.string,
    /** Classes to be applied to the Content Loader container */
    loaderContainerClass: PropTypes.string,
    /** Classes to be applied to the Content Loader */
    contentLoaderClass: PropTypes.string
  }

  static Loader = (loaderProps = {}) => {
    const {
      'vtex-share__button--loader': button,
      'vtex-share__button--loader-1': button1,
      'vtex-share__button--loader-2': button2,
      'vtex-share__button--loader-3': button3,
      containerClass,
      contentLoaderClass
    } = loaderProps
    const loaderStyles = {
      r: '1em',
      height: '2em',
      cy: '1em',
      ...button,
    }

    return (
      <div className={classNames('vtex-share vtex-share-loader', containerClass)}>
        <ContentLoader
          className={contentLoaderClass}
          style={{
            width: '100%',
            height: '100%',
          }}
          height="100%"
          width="100%"
          {...loaderProps}>
          <circle
            cx="1em"
            {...loaderStyles}
            {...button1}
          />
          <circle
            cx="3.5em"
            {...loaderStyles}
            {...button2}
          />
          <circle
            cx="6em"
            {...loaderStyles}
            {...button3}
          />
        </ContentLoader>
      </div>
    )
  }

  static defaultProps = {
    social: {
      Facebook: true,
      Twitter: true,
      WhatsApp: true,
    },
    options: {},
    className: 'flex flex-row'
  }

  static schema = {
    title: 'editor.share.title',
    description: 'editor.share.description',
    type: 'object',
    properties: {
      social: {
        title: 'editor.share.social.title',
        type: 'object',
        properties: {
          ...indexBy(
            prop('title'),
            SOCIAL_ENUM.map(socialNetwork => ({
              type: 'boolean',
              title: socialNetwork,
              default: Share.defaultProps.social[socialNetwork],
            }))
          ),
        },
      },
    },
  }

  render() {
    const {
      social,
      title,
      loading,
      options: { size },
      className,
      socialButtonClass,
      socialIconClass,
      loaderContainerClass,
      contentLoaderClass
    } = this.props

    if (loading) {
      return <Share.Loader
        containerClass={loaderContainerClass}
        contentLoaderClass={contentLoaderClass}
        {...this.props.styles}
      />
    }

    return (
      <div className={classNames('vtex-share', className)}>
        {Object.keys(social).map(
          (socialNetwork, index) =>
            social[socialNetwork] && (
              <SocialButton
                key={index}
                url={window.location && window.location.href}
                message={title}
                iconClass={socialIconClass}
                buttonClass={socialButtonClass}
                socialEnum={socialNetwork}
                size={size}
              />
            )
        )}
      </div>
    )
  }
}

export default Share
