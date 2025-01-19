import { ChevronUp } from 'lucide-react';

function PopularPost({full_name,votes,content}) {
	return (
		<div
			className="bg-gray-50 border text-gray-600 rounded-2xl w-full px-4 py-2"
		>
			<div className="flex justify-between items-center">
				<div className="space-x-1 mb-2">
					<span className="text-xs capitalize">
						{full_name}
					</span>
				</div>
				<div> 
					<span className="text-sm">{votes}</span>
					<ChevronUp size={16}  className='inline stroke-gray-600 -mt-0.5' />
				</div>
			</div>
			<p className="text-gray-700 text-sm">{content} </p>
		</div>
	);
}

export default PopularPost;
