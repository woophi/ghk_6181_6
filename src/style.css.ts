import { globalStyle, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

const bottomBtn = style({
  position: 'fixed',
  zIndex: 2,
  width: '100%',
  padding: '12px',
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  backgroundColor: '#FFFFFF',
});

const container = style({
  display: 'flex',
  padding: '1rem',
  flexDirection: 'column',
  gap: '1rem',
});

const boxSlide = style({
  display: 'flex',
  padding: '12px 1rem',
  flexDirection: 'column',
  gap: '1rem',
  borderRadius: '1rem',
  backgroundColor: '#EEEEFB8C',
  width: '152px',
  height: '132px',
});

const robotContainer = style({
  backgroundColor: '#F6F6FD',
  borderRadius: '1rem',
  padding: '1rem 20px 20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

const imgsStack = style({
  display: 'flex',
  alignItems: 'center',
});

const imgStack = recipe({
  base: {
    borderRadius: '50%',
    overflow: 'hidden',
    width: '32px',
    height: '32px',
  },
  variants: {
    aligned: {
      true: {
        marginLeft: '-8px',
        border: '1px solid #F6F6FD',
        backgroundColor: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
  },
});

const box = style({
  display: 'flex',
  padding: '12px 1rem',
  flexDirection: 'column',
  gap: '1rem',
  borderRadius: '1rem',
  backgroundColor: '#F6F6FD',
});
const rowSb = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const box2 = style({
  display: 'flex',
  padding: '1rem 12px',
  gap: '1rem',
  borderRadius: '1rem',
  backgroundColor: '#F6F6FD',
});

const stockSlide = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  gap: '1rem',
  borderRadius: '1rem',
  border: '2px solid #F2F3F5',
  width: '108px',
  height: '106px',
});

const stepStyle = style({});

globalStyle(`${stepStyle} > div > div > div:first-child`, {
  backgroundColor: 'var(--color-light-neutral-translucent-1300)',
  color: 'var(--color-light-text-primary-inverted)',
});

const stockRow = style({
  padding: '12px 8px',
  borderRadius: '1rem',
  backgroundColor: '#F2F3F5',
});

const swSlide = style({
  width: 'min-content',
});

export const appSt = {
  bottomBtn,
  container,
  boxSlide,
  robotContainer,
  imgsStack,
  imgStack,
  box,
  rowSb,
  box2,
  stockSlide,
  stepStyle,
  stockRow,
  swSlide,
};
