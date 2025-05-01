import { node } from "./nodes.js";

export function LinkedList() {
  let head = null;
  let size = -1;

  return {
    append(value) {
      if (head == null) this.prepend(value);
      else {
        let current = head;
        while (current.nextNode) current = current.nextNode;

        current.nextNode = node(value);
      }
      size++;
    },

    prepend(value) {
      const newNode = node(value, head);
      head = newNode;
      size++;
    },

    size() {
      return size == -1 ? 0 : size;
    },

    head() {
      return head;
    },

    tail() {
      let last = head;
      while (last.nextNode) last = last.nextNode;
      return last;
    },

    contains(value) {
      let tmp = head;
      while (tmp.nextNode) {
        if (tmp.value === value) return true;
        tmp = tmp.nextNode;
      }
      const last = this.tail();
      if (last.value === value) return true;
      else return false;
    },

    find(value) {
      let index = -1;
      let tmp = head;
      while (tmp.nextNode) {
        index++;
        if (tmp.value === value) return index;
        tmp = tmp.nextNode;
      }
      const last = this.tail();
      if (last.value === value) {
        index++;
        return index;
      } else return null;
    },

    at(index) {
      if (index < 0 || index >= size) return null;

      let node = head;
      let count = -1;
      while (node.nextNode) {
        count++;
        if (count === index) return node;
        node = node.nextNode;
      }
      count++;
      if (count === index) return this.tail();
    },

    pop() {
      if (head === null) {
        return;
      } else if (size === 1) {
        head = null;
        size--;
        return;
      }

      const last = this.tail();
      const index = this.find(last.value);
      const prev = this.at(index - 1);
      prev.nextNode = null;
      size--;
    },

    toString() {
      let str = "";

      for (let i = 0; i < size; i++) {
        const val = this.at(i);
        str += "( " + val.value + " ) -> ";
      }
      return str + null;
    },

    insertAt(value, index) {
      if (index < 0 || index >= size) return null;

      if (head === null) {
        this.append(value);
        return;
      } else if (index === 0) {
        this.prepend(value);
        return;
      }

      const prevNode = this.at(index - 1);
      const currentNode = this.at(index);

      prevNode.nextNode = node(value, currentNode);
      size++;
    },

    removeAt(index) {
      if (index < 0 || index >= size) return null;

      if (head === null) {
        return;
      } else if (size === 1) {
        this.pop();
        return;
      } else if (this.find(this.tail().value) === index) {
        this.pop();
        return;
      }

      const nxtNode = this.at(index + 1);

      if (index === 0) {
        head = nxtNode;
        size--;
      } else {
        const prevNode = this.at(index - 1);
        prevNode.nextNode = nxtNode;
        size--;
      }
    },
  };
}
