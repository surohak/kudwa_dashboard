import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ChartSkeleton from '../../pages/Dashboard/components/ChartSkeleton';

describe('ChartSkeleton component', () => {
  it('renders with default height', () => {
    const { container } = render(<ChartSkeleton />);
    const skeletonDiv = container.firstChild;
    expect(skeletonDiv).toHaveClass('animate-pulse');
    expect(skeletonDiv).toHaveClass('flex');
    expect(skeletonDiv).toHaveClass('flex-col');
    expect(skeletonDiv).toHaveClass('items-center');
    expect(skeletonDiv).toHaveStyle({ height: '400px' });

    // Check that it contains the gray elements
    const grayElements = container.querySelectorAll('.bg-gray-200');
    expect(grayElements.length).toBe(2);
  });

  it('renders with custom height', () => {
    const customHeight = 320;
    const { container } = render(<ChartSkeleton height={customHeight} />);
    const skeletonDiv = container.firstChild;
    expect(skeletonDiv).toHaveStyle({ height: `${customHeight}px` });
  });
});
