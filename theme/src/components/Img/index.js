// import React from 'react';
// import { default as GImg } from './GatsbyImage';

// const Img = React.forwardRef(
//   ({ alt, style, critical, className, imgStyle, ...props }, forwardedRef) => {
//     const src = props.src || props.url;
//     const { img, GatsbyImage, attrs } = React.useMemo(() => {
//       return { img, GatsbyImage: GImg, attrs: { ...props, imgStyle, src } };
//     }, [src, props, imgStyle]);

//     if (!props.fluid && !props.fixed) {
//       return (
//         <img
//           src={src}
//           alt={alt}
//           className={className}
//           style={{ ...imgStyle, ...style }}
//           ref={forwardedRef}
//         />
//       );
//     }
//     return (
//       <GatsbyImage
//         {...attrs}
//         alt={alt}
//         loading={critical ? `eager` : `lazy`}
//         fadeIn={critical === true ? false : true}
//         durationFadeIn={300}
//         style={style}
//         ref={forwardedRef}
//         className={className}
//       />
//     );
//   }
// );

// export default Img;
