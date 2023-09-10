interface CustomHeadingsProps {
    title: string,
    description: string
}


const CustomHeadings = ({ title, description }: CustomHeadingsProps) => {
  
    return (
    <>
        <div className=" justify-between ...">
                <h4 className="text-2xl font-extrabold">{title}</h4>
                <p className="text-sm text-muted-foreground">{description}</p>

        </div>


    </>
  )
}

export default CustomHeadings