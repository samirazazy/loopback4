export class Travers {

  private tree = [
    {id: 1, name: 'name', parent: null, },
    {id: 2, name: 'name', parent: 1, },
    {id: 3, name: 'name', parent: 1, },
    {id: 4, name: 'name', parent: 1, },
    {id: 5, name: 'name', parent: null, },
    {id: 6, name: 'name', parent: 5, },
    {id: 7, name: 'name', parent: 5, },
    {id: 8, name: 'name', parent: 5, },
  ]

  public travers(parent?: any) {
    if (parent === undefined) {parent = null}

    const ar: any = []
    this.tree.forEach((obj: any) => {
      if (obj.parent === parent) {
        const children = this.travers(obj.id)
        obj.children = children;
        ar.push(obj);
      }
    })

    return ar
  }
}
