function PostCard() {
  return (
    <>
      <div className="bg-gray-50 rounded-md p-7 my-6">
        <div className="flex">
          <div className="bg-gray-200 w-12 h-12 rounded-full me-5"></div>
          <div>
            <p>james taylor</p>
            <p className="text-sm">@jamestaylor</p>
          </div>
          <div className="text-gray-600 text-sm leading-6">&nbsp;&nbsp;1h ago</div>
        </div>
        <div className="my-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla recusandae nam facere pariatur, sint ratione excepturi doloribus quaerat ea reprehenderit. Aperiam deleniti inventore recusandae. Obcaecati amet distinctio nemo tempora necessitatibus.
        </div>
      </div>
    </>
  );
}

export default PostCard;
