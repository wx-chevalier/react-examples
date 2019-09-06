import { ReactNode } from 'react';
import { RouteComponentProps } from 'react-router-dom';

/**
 * Represents the base props of a `React` component;
 */
export interface BaseReactProps {
  /**
   * The class name of the component.
   */
  className?: string;

  children?: ReactNode;
}

/**
 * Represents the base props of a `React` route component;
 */
export interface BaseReactRouteProps extends BaseReactProps, RouteComponentProps {}
