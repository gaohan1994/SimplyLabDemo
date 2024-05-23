type EventCallback = (...args: []) => void;

class EventEmitter {
  static instance: EventEmitter | null = null;

  public static getInstance = () => {
    if (EventEmitter.instance === null) {
      EventEmitter.instance = new EventEmitter();
    }
    return EventEmitter.instance;
  };

  listenerMap = new Map();

  public readonly on = (event: string, executer: EventCallback) => {
    const eventExecuters = this.listenerMap.get(event) ?? [];
    eventExecuters.push(executer);
    this.listenerMap.set(event, eventExecuters);

    return () => {
      this.removeListener(event, executer);
    };
  };

  public readonly emit = (event: string, ...args: any[]) => {
    const executers = this.listenerMap.get(event) ?? [];

    for (let index = 0; index < executers.length; index++) {
      const executer = executers[index];
      executer(...args);
    }
  };

  public readonly once = (event: string, executer: EventCallback) => {
    const onceExecuter = () => {
      executer();
      this.removeListener(event, executer);
    };

    this.on(event, onceExecuter);
  };

  public readonly removeListener = (
    event: string,
    removeExecuter: EventCallback
  ) => {
    if (removeExecuter === undefined) {
      return this.listenerMap.delete(event);
    }

    const executers = this.listenerMap.get(event) ?? [];
    const removeIndex = executers.findIndex(
      (e: EventCallback) => e === removeExecuter
    );

    if (~removeIndex) {
      this.listenerMap.set(event, executers.splice(removeIndex, 1));
    }
  };

  public readonly removeAllListeners = () => {
    this.listenerMap.clear();
  };
}

const instance = EventEmitter.getInstance();

export default instance;
