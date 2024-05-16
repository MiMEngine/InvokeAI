import { useStore } from '@nanostores/react';
import InvocationNode from 'features/nodes/components/flow/nodes/Invocation/InvocationNode';
import { $templates } from 'features/nodes/store/nodesSlice';
import type { InvocationNodeData } from 'features/nodes/types/invocation';
import { memo, useMemo } from 'react';
import type { NodeProps } from 'reactflow';

import InvocationNodeUnknownFallback from './InvocationNodeUnknownFallback';

const InvocationNodeWrapper = (props: NodeProps<InvocationNodeData>) => {
  const { data, selected } = props;
  const { id: nodeId, type, isOpen, label } = data;
  const templates = useStore($templates);
  const hasTemplate = useMemo(() => Boolean(templates[type]), [templates, type]);

  if (!hasTemplate) {
    return (
      <InvocationNodeUnknownFallback nodeId={nodeId} isOpen={isOpen} label={label} type={type} selected={selected} />
    );
  }

  return <InvocationNode nodeId={nodeId} isOpen={isOpen} label={label} type={type} selected={selected} />;
};

export default memo(InvocationNodeWrapper);
