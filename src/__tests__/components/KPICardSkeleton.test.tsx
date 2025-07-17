import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import KPICardSkeleton from '../../pages/Dashboard/components/KPICardSkeleton';

describe('KPICardSkeleton', () => {
  it('renders the skeleton with proper styling', () => {
    render(<KPICardSkeleton />);

    // Get the container div
    const container = screen.getByTestId('kpi-card-skeleton');

    // Check that the container has the correct classes
    expect(container).toHaveClass('bg-white');
    expect(container).toHaveClass('rounded-xl');
    expect(container).toHaveClass('shadow-sm');
    expect(container).toHaveClass('animate-pulse');

    // Check that the skeleton elements are present
    const skeletonElements = container.querySelectorAll('div[class*="bg-gray-200"]');
    expect(skeletonElements.length).toBe(3);

    // Check specific skeleton elements
    const titleSkeleton = skeletonElements[0];
    const valueSkeleton = skeletonElements[1];
    const labelSkeleton = skeletonElements[2];

    expect(titleSkeleton).toHaveClass('h-6');
    expect(titleSkeleton).toHaveClass('w-32');

    expect(valueSkeleton).toHaveClass('h-8');
    expect(valueSkeleton).toHaveClass('w-full');

    expect(labelSkeleton).toHaveClass('h-4');
    expect(labelSkeleton).toHaveClass('w-24');
  });
});
